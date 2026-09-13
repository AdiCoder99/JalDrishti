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
    <section>
      <div className="mb-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
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
            className="flex cursor-pointer items-center gap-3"
          >
            <input
              type="checkbox"
              checked={impactLayers[option.id]}
              onChange={(e) =>
                updateImpactLayer(option.id, e.target.checked)
              }
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
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