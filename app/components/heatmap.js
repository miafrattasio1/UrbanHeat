import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet.heat";

export default function Heatmap({ data }) {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const heatLayerRef = useRef(null);
    const [isMounted, setIsMounted] = useState(false);

    // Initialize the map once when the component is mounted
    useEffect(() => {
        setIsMounted(true);

        return () => {
            setIsMounted(false);
        };
    }, []);

    useEffect(() => {
        if (!isMounted || !mapRef.current || mapInstanceRef.current) return;

        // Initialize the map only once using the ref
        mapInstanceRef.current = L.map(mapRef.current, {
            center: [data[0]?.latitude || 0, data[0]?.longitude || 0],
            zoom: 13,
            attributionControl: false,
        });

        // Add the tile layer to the map
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap contributors",
        }).addTo(mapInstanceRef.current);

        // Initialize heatmap layer
        const heatData = data.map((item) => [item.latitude, item.longitude, item.T_C]);
        heatLayerRef.current = L.heatLayer(heatData, { radius: 25 }).addTo(mapInstanceRef.current);

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
                heatLayerRef.current = null;
            }
        };
    }, [isMounted, data]);

    // Update heatmap when the data changes
    useEffect(() => {
        if (!isMounted || !heatLayerRef.current || !data.length) return;

        const heatData = data.map((item) => [item.latitude, item.longitude, item.T_C]);
        heatLayerRef.current.setLatLngs(heatData);

        // Optionally recenter the map
        mapInstanceRef.current?.setView(
            [data[0].latitude, data[0].longitude],
            13
        );
    }, [data, isMounted]);

    return <div ref={mapRef} style={{ height: "300px", width: "100%" }} />;
}