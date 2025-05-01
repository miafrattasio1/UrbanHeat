"use client";

import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

// Generate a color gradient with custom color ranges
const generateGradient = () => {
    const gradient = [];

    // Blues (-10°C to 0°C)
    for (let i = -10; i <= 0; i++) {
        const hue = 240 - ((240 - 210) * (i + 10)) / 10; // Blue to light blue
        gradient.push(`hsl(${hue}, 100%, 50%)`);
    }

    // Greens (0°C to 10°C)
    for (let i = 0; i <= 10; i++) {
        const hue = 120 - ((120 - 60) * i) / 10; // Green to yellow-green
        gradient.push(`hsl(${hue}, 100%, 50%)`);
    }

    // Yellows (10°C to 20°C)
    for (let i = 10; i <= 20; i++) {
        const hue = 60 - ((60 - 30) * (i - 10)) / 10; // Yellow to yellow-orange
        gradient.push(`hsl(${hue}, 100%, 50%)`);
    }

    // Oranges (20°C to 30°C)
    for (let i = 20; i <= 30; i++) {
        const hue = 30 - ((30 - 0) * (i - 20)) / 10; // Orange to red-orange
        gradient.push(`hsl(${hue}, 100%, 50%)`);
    }

    // Reds (30°C to 40°C)
    for (let i = 30; i <= 40; i++) {
        const hue = (i - 30) * (360 / 10); // Red to deep red
        gradient.push(`hsl(${hue}, 100%, 50%)`);
    }

    return gradient;
};

const temperatureGradient = generateGradient();

const getColor = (tempCelsius) => {
    if (tempCelsius == null || isNaN(tempCelsius)) return "#888"; // fallback gray

    if (tempCelsius <= -10) return temperatureGradient[0];
    if (tempCelsius >= 40) return temperatureGradient[temperatureGradient.length - 1];

    const index = Math.round(tempCelsius + 10); // shift -10 to 0, 0 to 10, ..., 40 to 50
    return temperatureGradient[index];
};

// Render circle markers with temperature-based color
function ColoredDotsLayer({ points }) {
    return (
        <>
            {points.map((p, idx) => {
                const temp = p.T_C ?? 20; // Use 'T_C' as the temperature source
                return (
                    <CircleMarker
                        key={idx}
                        center={[p.latitude, p.longitude]}
                        radius={14}
                        color={getColor(temp)}
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
                zoom={15}
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
