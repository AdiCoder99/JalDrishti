import { useAppContext } from "../../context/useAppContext";

const MapToolbar = () => {
  const views = ["Flood Extent", "Water Depth", "Velocity", "Impact", "Compare"];
  const { activeMapView, setActiveMapView } = useAppContext();

  return (
    <div className="flex min-h-14 shrink-0 flex-wrap items-center justify-between gap-2 border-b border-[#d5e0e8] bg-white px-3 py-2">
      <div className="flex items-center gap-1 rounded-md bg-[#edf3f7] p-1">
        {views.map((view) => (
          <button
            key={view}
            type="button"
            onClick={() => setActiveMapView(view)}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
              view === activeMapView
                ? "bg-[#126ba2] text-white shadow-sm"
                : "text-slate-500 hover:bg-white hover:text-[#10253a]"
            }`}
          >
            {view}
          </button>
        ))}
      </div>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Live simulation
      </span>
    </div>
  );
};

export default MapToolbar;