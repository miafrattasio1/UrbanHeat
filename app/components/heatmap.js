"use client";

import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import { useEffect, useState } from "react";

function HeatLayer({ points }) {
    const map = useMap();

    useEffect(() => {
        if (!points || points.length === 0 || !map) return;

        // Check if window is defined (i.e., client-side)
        if (typeof window !== "undefined") {
            // Normalize intensity values between 0 and 1
            const maxIntensity = Math.max(...points.map(p => p.intensity ?? 0.6));
            const heatData = points.map((p) => [
                p.latitude,
                p.longitude,
                (p.intensity ?? 0.6) / maxIntensity
            ]);

            // Clear old heat layers (but keep the base map tiles)
            map.eachLayer((layer) => {
                if (layer.options?.pane === "overlayPane") {
                    map.removeLayer(layer);
                }
            });

            const heat = window.L.heatLayer(heatData, {
                radius: 25,
                blur: 15,
                maxZoom: 17,
                gradient: {
                    0.0: "blue",
                    0.4: "lime",
                    0.6: "yellow",
                    0.8: "orange",
                    1.0: "red"
                }
            });

            heat.addTo(map);

            // Zoom to bounds of heat data
            const latlngs = heatData.map(([lat, lng]) => [lat, lng]);
            const bounds = window.L.latLngBounds(latlngs);
            map.fitBounds(bounds, { padding: [20, 20] });
        }
    }, [map, points]);

    return null;
}

export default function Heatmap({ data }) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // Set state only on client-side
        setIsClient(true);
    }, []);

    if (!data || data.length === 0) return <p>No data available</p>;

    if (!isClient) {
        return null; // Or you could show a loading spinner
    }

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
                <HeatLayer points={data} />
            </MapContainer>
        </div>
    );
}
