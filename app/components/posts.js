"use client";
import { useEffect, useState, useMemo } from "react";
import { ref, get } from "firebase/database";
import { rtdb } from "../../firebase/config";
import Heatmap from "./Heatmap"; // Import the Heatmap component

export default function Posts({ searchTerm = '' }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dbRef = ref(rtdb);
                const allDataSnap = await get(dbRef);
                const allData = allDataSnap.val();

                if (!allData || !allData.sensor_data) {
                    setError("Sensor data is missing.");
                    setLoading(false);
                    return;
                }

                const allSensorTransects = Object.entries(allData.sensor_data || {});
                const metadataBlocks = Object.entries(allData)
                    .filter(([key, value]) =>
                        key !== 'sensor_data' &&
                        typeof value === 'object' &&
                        Object.keys(value).some(k => k.startsWith("Email,City,Time"))
                    );

                let postsCombined = [];

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
                            const metaTimeArr = JSON.parse(metaTimeStr);
                            const metaTimestamp = metaTimeArr[2];
                            const timeDiff = Math.abs(representativeTimestamp - metaTimestamp);
                            if (timeDiff < minTimeDiff) {
                                minTimeDiff = timeDiff;
                                bestMatch = metaBlock;
                            }
                        } catch (e) {
                            console.warn("Metadata parsing error", e);
                        }
                    }

                    if (!bestMatch) continue;

                    const [email, city] = JSON.parse(bestMatch["Email,City,Time"]);
                    const latLongEntries = Object.entries(bestMatch)
                        .filter(([k]) => k.startsWith("Lat,Long,Time"))
                        .map(([_, val]) => {
                            const [lat, lng, time] = Array.isArray(val) ? val : JSON.parse(val);
                            return { lat, lng, time };
                        });

                    const findClosestLocation = (timestamp) => {
                        let closest = latLongEntries[0];
                        let minDiff = Math.abs(timestamp - closest.time);
                        for (const loc of latLongEntries) {
                            const diff = Math.abs(timestamp - loc.time);
                            if (diff < minDiff) {
                                closest = loc;
                                minDiff = diff;
                            }
                        }
                        return { latitude: closest.lat, longitude: closest.lng };
                    };

                    const enrichedReadings = flatSensor.map((entry) => ({
                        ...entry,
                        ...findClosestLocation(entry.timestamp)
                    }));

                    postsCombined.push({
                        id: transectName,
                        csvData: enrichedReadings,
                        email,
                        city
                    });
                }

                setPosts(postsCombined);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to load posts");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    const filteredPosts = useMemo(() => {
        return posts.filter(post =>
            post.csvData.some(row =>
                `${row.latitude},${row.longitude}`.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [posts, searchTerm]);

    const generateCSV = (data) => {
        const headers = [
            "Timestamp",
            "Latitude",
            "Longitude",
            "Temperature (°C)",
            "Humidity (%)",
            "Pressure (hPa)",
            "Gas",
            "Light",
            "Sound"
        ];

        const rows = data.map(obj => {
            let timestamp = "";
            if (obj.timestamp && !isNaN(obj.timestamp)) {
                try {
                    timestamp = new Date(Number(obj.timestamp)).toISOString();
                } catch (e) {
                    timestamp = "";
                }
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
                        const previewCSV = generateCSV(post.csvData.slice(0, 3));
                        const fullCSV = generateCSV(post.csvData);
                        return (
                            <div key={post.id} className="post-card">
                                <div className="post-header">
                                    <h3>
                                        Transect in {post.city}, {post.email}
                                    </h3>
                                </div>

                                <div className="csv-preview">
                                    <Heatmap data={post.csvData} />
                                </div>

                                <div className="csv-preview">
                                    <textarea
                                        value={previewCSV}
                                        readOnly
                                        rows={5}
                                        className="csv-textarea"
                                    />
                                </div>

                                <button
                                    onClick={() => downloadCSV(fullCSV, `transect_${post.id}.csv`)}
                                    className="download-btn"
                                >
                                    Download Full CSV
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
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .posts-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
                    gap: 30px;
                }

                .post-card {
                    background: #ffffff;
                    border-radius: 12px;
                    padding: 20px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .post-header {
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 1px solid #e0e0e0;
                    padding-bottom: 8px;
                }

                .csv-preview {
                    background: #f5f5f5;
                    padding: 10px;
                    border-radius: 8px;
                    overflow-x: auto;
                }

                .csv-textarea {
                    width: 100%;
                    font-family: monospace;
                    background: transparent;
                    border: none;
                    resize: none;
                    outline: none;
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
