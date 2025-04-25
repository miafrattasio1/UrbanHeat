"use client";
import { useEffect, useState, useMemo } from "react";
import { ref, get, child } from "firebase/database";
import { rtdb } from "../../firebase/config";

function groupSensorData(sensorData, timeThreshold = 30000) {
    let grouped = [];
    let currentGroup = [];

    sensorData.sort((a, b) => a.timestamp - b.timestamp);

    for (let i = 0; i < sensorData.length; i++) {
        const reading = sensorData[i];

        if (
            currentGroup.length === 0 ||
            Math.abs(reading.timestamp - currentGroup[0].timestamp) <= timeThreshold
        ) {
            currentGroup.push(reading);
        } else {
            grouped.push(currentGroup);
            currentGroup = [reading];
        }
    }

    if (currentGroup.length > 0) grouped.push(currentGroup);
    return grouped;
}

export default function Posts({ searchTerm = '' }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dbRef = ref(rtdb);
                const [locationSnap, sensorSnap] = await Promise.all([
                    get(child(dbRef, "UrbanEnvData")),
                    get(child(dbRef, "sensor_data/device_001")),
                ]);

                const locationData = locationSnap.val();
                const sensorRaw = sensorSnap.val();

                if (!locationData || !sensorRaw) {
                    setError("Location or sensor data is missing.");
                    setLoading(false);
                    return;
                }

                // Debug: log the entire locationData object
                console.log("Location data structure:", locationData);

                // Parse the Email, City, and Time string and extract the values
                const locationString = locationData?.["Email,City,Time"];
                let email = "Unknown Email";
                let city = "Unknown City";

                if (locationString) {
                    try {
                        // Parse the string into an array
                        const locationArray = JSON.parse(locationString);
                        email = locationArray[0] || "Unknown Email";
                        city = locationArray[1] || "Unknown City";
                    } catch (e) {
                        console.error("Error parsing location string:", e);
                    }
                }

                // Debug: log the extracted email and city
                console.log("Email:", email);
                console.log("City:", city);

                // Parse coordinates and other location info correctly from the database
                const latLongEntries = Object.entries(locationData)
                    .filter(([key]) => key.startsWith("Lat,Long,Time"))
                    .map(([_, value]) => {
                        // If the value is a string representation of an array, parse it
                        const [lat, lng, time] = Array.isArray(value) ? value : JSON.parse(value);
                        return { lat, lng, time };
                    });

                const findClosestLocation = (timestampSec) => {
                    const timestampMs = timestampSec * 1000;
                    let closest = latLongEntries[0];
                    let minDiff = Math.abs(timestampMs - closest.time);

                    for (const loc of latLongEntries) {
                        const diff = Math.abs(timestampMs - loc.time);
                        if (diff < minDiff) {
                            minDiff = diff;
                            closest = loc;
                        }
                    }

                    return {
                        latitude: closest.lat,
                        longitude: closest.lng,
                    };
                };

                let flatReadings = [];
                for (const session in sensorRaw) {
                    const sessionData = sensorRaw[session];
                    for (const key in sessionData) {
                        const entry = sessionData[key];
                        const coords = findClosestLocation(entry.timestamp);
                        flatReadings.push({
                            ...entry,
                            ...coords,
                        });
                    }
                }

                const grouped = groupSensorData(flatReadings);

                const postsFormatted = grouped.map((group, i) => ({
                    id: `transect-${i}`,
                    csvData: group,
                    email,
                    city,
                }));

                setPosts(postsFormatted);
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
            "Altitude (m)",
            "Pressure (hPa)",
            "Gas",
            "Light",
            "Sound",
            "Thermo_C",
            "Thermo_F"
        ];

        const rows = data.map(obj => {
            const timestamp = obj.timestamp
                ? new Date(obj.timestamp * 1000).toISOString()
                : "";
            return [
                timestamp,
                obj.latitude ?? "",
                obj.longitude ?? "",
                obj.temperature ?? "",
                obj.humidity ?? "",
                obj.altitude ?? "",
                obj.pressure ?? "",
                obj.gas ?? "",
                obj.light ?? "",
                obj.sound ?? "",
                obj.thermo_c ?? "",
                obj.thermo_f ?? ""
            ].join(",");
        });

        return [headers.join(","), ...rows].join("\n");
    };

    const downloadCSV = (csv, filename) => {
        const BOM = "\uFEFF"; // Byte Order Mark for Excel compatibility
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
                        const { latitude, longitude } = post.csvData[0] || {};

                        return (
                            <div key={post.id} className="post-card">
                                <div className="post-header">
                                    <h3>
                                        Transect in {post.city}, {post.email}
                                    </h3>
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
