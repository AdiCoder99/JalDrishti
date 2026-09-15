const impactOptions = [
  {
    id: "settlements",
    label: "Settlements",
  },
  {
    id: "roads",
    label: "Roads",
  },
  {
    id: "buildings",
    label: "Buildings",
  },
  {
    id: "bridges",
    label: "Bridges",
  },
  {
    id: "criticalInfrastructure",
    label: "Critical Infrastructure",
  },
];

const ImpactAnalysis = ({ impactLayers, updateImpactLayer }) => {
  return (
    <section className="rounded-lg border border-[#d5e0e8] bg-white p-4 shadow-sm">
      <div className="mb-4 border-b border-[#e5edf2] pb-3">
        <h3 className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#126ba2]">
          Impact Analysis
        </h3>

        <p className="mt-1 text-xs text-slate-400">
          Select assets to include in the analysis.
        </p>
      </div>

      <div className="space-y-2.5">
        {impactOptions.map((option) => (
          <label
            key={option.id}
            className="flex cursor-pointer items-center gap-3 rounded-md border border-transparent px-2.5 py-2 transition hover:border-cyan-100 hover:bg-cyan-50"
          >
            <input
              type="checkbox"
              checked={impactLayers[option.id]}
              onChange={(e) =>
                updateImpactLayer(option.id, e.target.checked)
              }
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-200"
            />

            <span className="text-sm text-slate-700">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </section>
  );
}

export default ImpactAnalysis;