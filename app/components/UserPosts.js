"use client";

import { useEffect, useState, useMemo } from "react";
import { ref, get } from "firebase/database";
import { rtdb } from "../../firebase/config";
import dynamic from "next/dynamic";

const Heatmap = dynamic(() => import("./Heatmap"), { ssr: false });

export default function UserPosts({ userEmail, searchTerm = "" }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dbRef = ref(rtdb);
                const snapshot = await get(dbRef);
                const data = snapshot.val();

                if (!data || !data.sensor_data) {
                    setError("Sensor data is missing.");
                    setLoading(false);
                    return;
                }

                const allSensorTransects = Object.entries(data.sensor_data || {});
                const metadataBlocks = Object.entries(data).filter(
                    ([key, value]) =>
                        key !== "sensor_data" &&
                        typeof value === "object" &&
                        Object.keys(value).some(k => k.startsWith("Email,City,Time"))
                );

                let userPosts = [];

                for (const [transectName, transectData] of allSensorTransects) {
                    let flatSensor = [];

                    for (const sessionId in transectData) {
                        const session = transectData[sessionId];
                        for (const pointId in session) {
                            const entry = session[pointId];
                            flatSensor.push({ ...entry });
                        }
                    }

                    if (flatSensor.length === 0) continue;
                    const representativeTimestamp = flatSensor[0].timestamp;

                    let bestMatch = null;
                    let minTimeDiff = Infinity;

                    for (const [metaKey, metaBlock] of metadataBlocks) {
                        try {
                            const metaTimeStr = metaBlock["Email,City,Time"];
                            if (!metaTimeStr) continue;
                            const metaArr = JSON.parse(metaTimeStr);
                            const timeDiff = Math.abs(representativeTimestamp - metaArr[2]);
                            if (timeDiff < minTimeDiff) {
                                minTimeDiff = timeDiff;
                                bestMatch = metaBlock;
                            }
                        } catch {}
                    }

                    if (!bestMatch) continue;
                    const [email, city] = JSON.parse(bestMatch["Email,City,Time"]);
                    if (email !== userEmail) continue;

                    const latLongEntries = Object.entries(bestMatch)
                        .filter(([k]) => k.startsWith("Lat,Long,Time"))
                        .map(([_, val]) => {
                            try {
                                const [lat, lng, time] = Array.isArray(val) ? val : JSON.parse(val);
                                return { lat, lng, time };
                            } catch {
                                return null;
                            }
                        })
                        .filter(loc => loc && typeof loc.lat === "number" && typeof loc.lng === "number");

                    const findClosestLocation = (timestamp) => {
                        let closest = latLongEntries[0];
                        let minDiff = Math.abs(timestamp - closest.time);
                        for (const loc of latLongEntries) {
                            const diff = Math.abs(timestamp - loc.time);
                            if (diff < minDiff) {
                                minDiff = diff;
                                closest = loc;
                            }
                        }
                        return {
                            latitude: closest?.lat ?? null,
                            longitude: closest?.lng ?? null,
                        };
                    };

                    const enrichedReadings = flatSensor
                        .map(entry => {
                            const coords = findClosestLocation(entry.timestamp);
                            if (!coords || coords.latitude == null || coords.longitude == null) return null;
                            return {
                                ...entry,
                                ...coords,
                                intensity: 0.6,
                            };
                        })
                        .filter(e => e);

                    if (enrichedReadings.length === 0) continue;

                    userPosts.push({
                        id: transectName,
                        csvData: enrichedReadings,
                        email,
                        city,
                    });
                }

                setPosts(userPosts);
            } catch (err) {
                console.error("Error fetching Firebase data:", err);
                setError("Failed to load user posts.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userEmail, searchTerm]);

    const filteredPosts = useMemo(() => {
        return posts.filter(post =>
            post.city.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [posts, searchTerm]);

    const generateCSV = (data) => {
        const headers = [
            "Timestamp", "Latitude", "Longitude",
            "Temperature (°C)", "Humidity (%)", "Pressure (hPa)",
            "Gas", "Light", "Sound"
        ];
        const rows = data.map(obj => {
            let timestamp = "";
            if (obj.timestamp && !isNaN(obj.timestamp)) {
                try {
                    timestamp = new Date(Number(obj.timestamp)).toISOString();
                } catch {}
            }
            return [
                timestamp,
                obj.latitude ?? "",
                obj.longitude ?? "",
                obj.T_C ?? "",
                obj.H ?? "",
                obj.P ?? "",
                obj.G ?? "",
                obj.lgt ?? "",
                obj.sound ?? ""
            ].join(",");
        });
        return [headers.join(","), ...rows].join("\n");
    };

    const downloadCSV = (csv, filename) => {
        const BOM = "\uFEFF";
        const blob = new Blob([BOM + csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        link.click();
    };

    if (loading) return <div className="spinner">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="posts-container">
            <div className="posts-grid">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map(post => {
                        const fullCSV = generateCSV(post.csvData);
                        return (
                            <div key={post.id} className="post-card">
                                <div className="post-header">
                                    <h3>Transect in {post.city}</h3>
                                </div>
                                <div className="csv-preview heatmap-box">
                                    <Heatmap data={post.csvData} />
                                </div>
                                <div className="csv-preview table-scroll">
                                    <table className="csv-table">
                                        <thead>
                                        <tr>
                                            <th>Timestamp</th>
                                            <th>Latitude</th>
                                            <th>Longitude</th>
                                            <th>Temp (°C)</th>
                                            <th>Humidity</th>
                                            <th>Pressure</th>
                                            <th>Gas</th>
                                            <th>Light</th>
                                            <th>Sound</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {post.csvData.slice(0, 5).map((row, i) => (
                                            <tr key={i}>
                                                <td>{new Date(Number(row.timestamp)).toISOString()}</td>
                                                <td>{row.latitude}</td>
                                                <td>{row.longitude}</td>
                                                <td>{row.T_C}</td>
                                                <td>{row.H}</td>
                                                <td>{row.P}</td>
                                                <td>{row.G}</td>
                                                <td>{row.lgt}</td>
                                                <td>{row.sound}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                                <button
                                    className="download-btn"
                                    onClick={() => downloadCSV(fullCSV, `user_transect_${post.id}.csv`)}
                                >
                                    Download CSV
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <p className="no-posts">No posts found.</p>
                )}
            </div>

            <style jsx>{`
                .posts-container {
                    padding: 30px;
                    max-width: 1400px;
                    margin: 0 auto;
                }
                .posts-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
                    gap: 30px;
                }
                .post-card {
                    background: #fff;
                    border-radius: 12px;
                    padding: 20px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }
                .post-header {
                    border-bottom: 1px solid #e0e0e0;
                    padding-bottom: 8px;
                }
                .csv-preview.heatmap-box {
                    height: 300px;
                    background: #f5f5f5;
                    border-radius: 8px;
                    overflow: hidden;
                    padding: 10px;
                }
                .csv-preview.table-scroll {
                    overflow-x: auto;
                    background: #f9f9f9;
                    border: 1px solid #ddd;
                    padding: 6px;
                    border-radius: 8px;
                }
                .csv-table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 0.75rem;
                }
                .csv-table th,
                .csv-table td {
                    padding: 4px 6px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                    white-space: nowrap;
                }
                .csv-table tr:hover {
                    background-color: #eef6ff;
                }
                .download-btn {
                    background-color: #007bff;
                    color: white;
                    border: none;
                    padding: 10px 15px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: bold;
                    transition: background-color 0.3s ease;
                }
                .download-btn:hover {
                    background-color: #0056b3;
                }
                .spinner, .error, .no-posts {
                    text-align: center;
                    padding: 40px;
                    font-size: 1.2rem;
                    color: #666;
                }
            `}</style>
        </div>
    );
}
