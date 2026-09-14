import { useAppContext } from "../../context/useAppContext";

const MapLayers = () => {
    const { mapLayers: layers, toggleMapLayer: toggleLayer, changeBaseMap } = useAppContext();

    const simulationLayers = [
        ["floodExtent", "Flood Extent", "Active flood boundary"],
        ["waterDepth", "Water Depth", "Estimated inundation depth"],
        ["flowVelocity", "Flow Velocity", "Water movement speed"],
    ];

    const referenceLayers = [
        ["riverNetwork", "River Network", "Streams and drainage"],
        ["damLocation", "Dam Location", "Tehri Dam location"],
        ["settlements", "Settlements", "Nearby populated areas"],
    ];

    return (
        <aside className="w-80 shrink-0 overflow-y-auto border-l border-slate-200 bg-slate-50">
            <div className="sticky top-0 z-10 border-b border-slate-200 bg-white px-4 py-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <h2 className="text-sm font-bold text-slate-900">Map Layers</h2>
                        <p className="mt-1 text-xs text-slate-500">
                            Control what is displayed on the map.
                        </p>
                    </div>
                    <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-700">
                        Live
                    </span>
                </div>
            </div>

            <div className="space-y-4 p-3">
                <LayerGroup title="Simulation Layers" tone="blue" layers={simulationLayers} values={layers} onToggle={toggleLayer} />
                <LayerGroup title="Reference Layers" tone="slate" layers={referenceLayers} values={layers} onToggle={toggleLayer} />

                <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                    <div className="mb-3 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-violet-500" />
                        <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                            Base Map
                        </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        {[
                            ["osm", "OpenStreetMap"],
                            ["satellite", "Satellite"],
                        ].map(([value, label]) => (
                            <label
                                key={value}
                                className={`flex cursor-pointer items-center gap-2 rounded-lg border px-2.5 py-2 text-xs font-medium transition ${
                                    layers.baseMap === value
                                        ? "border-blue-200 bg-blue-50 text-blue-700"
                                        : "border-slate-200 text-slate-600 hover:border-blue-100 hover:bg-slate-50"
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="baseMap"
                                    checked={layers.baseMap === value}
                                    onChange={() => changeBaseMap(value)}
                                    className="h-3.5 w-3.5 accent-blue-600"
                                />
                                {label}
                            </label>
                        ))}
                    </div>
                </section>
            </div>
        </aside>
    );
};

const LayerGroup = ({ title, tone, layers, values, onToggle }) => (
    <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${tone === "blue" ? "bg-blue-500" : "bg-slate-400"}`} />
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                {title}
            </h3>
        </div>
        <div className="space-y-2">
            {layers.map(([id, label, description]) => (
                <label
                    key={id}
                    className={`flex cursor-pointer items-center justify-between rounded-lg border px-3 py-2.5 transition ${
                        values[id]
                            ? "border-blue-100 bg-blue-50/70"
                            : "border-transparent hover:border-slate-200 hover:bg-slate-50"
                    }`}
                >
                    <span>
                        <span className="block text-sm font-medium text-slate-700">{label}</span>
                        <span className="mt-0.5 block text-[11px] text-slate-400">{description}</span>
                    </span>
                    <span className={`relative h-5 w-9 rounded-full transition ${values[id] ? "bg-blue-600" : "bg-slate-300"}`}>
                        <input
                            type="checkbox"
                            checked={values[id]}
                            onChange={() => onToggle(id)}
                            className="peer sr-only"
                        />
                        <span className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition peer-checked:translate-x-4" />
                    </span>
                </label>
            ))}
        </div>
    </section>
);

export default MapLayers;