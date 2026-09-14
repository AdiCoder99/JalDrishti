import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapToolbar from "./MapToolbar";
import MapLegend from "./MapLegend";
import SimulationTimeline from "../SimulationTimeline/SimulationTimeline";

const FloodMap = () => {
    const tehriDam = [30.3753, 78.4804];
    const riverPath = [
        [30.3753, 78.4804],
        [30.36, 78.50],
        [30.34, 78.53],
        [30.31, 78.55],
        [30.28, 78.58],
    ];

    return (
        <div className="flex w-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <MapToolbar />
            <div className="relative h-[34rem] min-h-0 w-full overflow-hidden">
                <MapContainer
                    center={tehriDam}
                    zoom={11}
                    className="h-full w-full"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={tehriDam}>
                        <Popup>
                            <div>
                                <p className="font-semibold">Tehri Dam</p>
                                <p className="text-sm text-slate-500">Uttarakhand</p>
                            </div>
                        </Popup>
                    </Marker>
                    <Polyline
                        positions={riverPath}
                        pathOptions={{
                            color: "#2563EB",
                            weight: 4,
                        }}
                    />
                </MapContainer>
                <MapLegend />
                <div className="pointer-events-none absolute right-4 top-4 z-[1000] rounded-lg border border-white/70 bg-slate-900/85 px-3 py-2 text-white shadow-lg backdrop-blur">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-300">Active scenario</p>
                    <p className="mt-0.5 text-xs font-bold">Tehri Dam Break</p>
                </div>
            </div>
            <div className="mx-auto w-full max-w-3xl">
                <SimulationTimeline />
            </div>
        </div>
    );
};

export default FloodMap;