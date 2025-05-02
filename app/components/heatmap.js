"use client";

import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

// Get a color between green (low) and red (high) based on temp and range
const getColorFromRange = (temp, minTemp, maxTemp) => {
    if (temp == null || isNaN(temp)) return "#888";

    if (minTemp === maxTemp) return "hsl(60, 100%, 50%)"; // fallback yellow if all temps are same

    const ratio = (temp - minTemp) / (maxTemp - minTemp);
    const hue = 120 - ratio * 120;
    return `hsl(${hue}, 100%, 50%)`;
};

// Render circle markers with dynamic gradient color
function ColoredDotsLayer({ points }) {
    const temps = points.map((p) => p.T_C).filter((t) => t != null && !isNaN(t));
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);

    return (
        <>
            {points.map((p, idx) => {
                const temp = p.T_C ?? 20;
                const color = getColorFromRange(temp, minTemp, maxTemp);
                return (
                    <CircleMarker
                        key={idx}
                        center={[p.latitude, p.longitude]}
                        radius={2}
                        color={color}
                        fillOpacity={1}
                        stroke={false}
                    />
                );
            })}
        </>
    );
}

export default function Heatmap({ data }) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!data || data.length === 0) return <p>No data available</p>;
    if (!isClient) return null;

    const firstPoint = data[0];
    const center = [firstPoint.latitude, firstPoint.longitude];

    return (
        <div style={{ height: "300px", width: "100%" }}>
            <MapContainer
                center={center}
                zoom={26}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%", borderRadius: "8px" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                <ColoredDotsLayer points={data} />
            </MapContainer>
        </div>
    );
}
