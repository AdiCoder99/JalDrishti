const BasicParameters = ({ scenario, updateScenario }) => {
  return (
    <section className="rounded-lg border border-[#d5e0e8] bg-white p-4 shadow-sm">
      <div className="mb-4 border-b border-[#e5edf2] pb-3">
        <h3 className="text-sm font-semibold text-[#126ba2]">
          Basic Parameters
        </h3>
      </div>

      <div className="space-y-4 [&_label]:font-semibold [&_label]:text-slate-600 [&_input]:rounded-md [&_input]:border-[#ccd9e2] [&_input]:bg-[#f8fafc] [&_input]:shadow-none [&_input]:transition [&_input]:focus:border-cyan-500 [&_input]:focus:ring-2 [&_input]:focus:ring-cyan-100 [&_select]:rounded-md [&_select]:border-[#ccd9e2] [&_select]:bg-[#f8fafc] [&_select]:shadow-none [&_select]:transition [&_select]:focus:border-cyan-500 [&_select]:focus:ring-2 [&_select]:focus:ring-cyan-100">
        {/* Dam */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-700">
            Dam
          </label>

          <select
            value={scenario.dam}
            onChange={(e) => updateScenario("dam", e.target.value)}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="tehri">Tehri Dam</option>
            <option value="bhakra">Bhakra Dam</option>
            <option value="hirakud">Hirakud Dam</option>
          </select>
        </div>

        {/* Scenario Type */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-700">
            Scenario Type
          </label>

          <select
            value={scenario.scenarioType}
            onChange={(e) =>
              updateScenario("scenarioType", e.target.value)
            }
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="dam_break">Dam Break</option>
            <option value="sudden_release">
              Sudden Reservoir Release
            </option>
            <option value="river_blockage">
              River Blockage / Natural Dam Failure
            </option>
          </select>
        </div>

        {/* Reservoir Water Level */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-700">
            Reservoir Water Level
          </label>

          <div className="relative">
            <input
              type="number"
              min="0"
              value={scenario.reservoirLevel}
              onChange={(e) =>
                updateScenario(
                  "reservoirLevel",
                  Number(e.target.value)
                )
              }
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 pr-12 font-mono text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />

            <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-slate-400">
              m
            </span>
          </div>
        </div>

        {/* Breach Width */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-700">
            Breach Width
          </label>

          <div className="relative">
            <input
              type="number"
              min="0"
              value={scenario.breachWidth}
              onChange={(e) =>
                updateScenario(
                  "breachWidth",
                  Number(e.target.value)
                )
              }
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 pr-12 font-mono text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />

            <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-slate-400">
              m
            </span>
          </div>
        </div>

        {/* Breach Formation Time */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-700">
            Breach Formation Time
          </label>

          <div className="relative">
            <input
              type="number"
              min="1"
              value={scenario.breachFormationTime}
              onChange={(e) =>
                updateScenario(
                  "breachFormationTime",
                  Number(e.target.value)
                )
              }
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 pr-14 font-mono text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />

            <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-slate-400">
              min
            </span>
          </div>
        </div>

        {/* Simulation Duration */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-700">
            Simulation Duration
          </label>

          <div className="relative">
            <input
              type="number"
              min="1"
              value={scenario.simulationDuration}
              onChange={(e) =>
                updateScenario(
                  "simulationDuration",
                  Number(e.target.value)
                )
              }
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 pr-16 font-mono text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />

            <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-slate-400">
              hours
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BasicParameters;