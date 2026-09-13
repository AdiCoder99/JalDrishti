const outputOptions = [
  {
    id: "floodExtent",
    label: "Flood Extent",
  },
  {
    id: "waterDepth",
    label: "Water Depth",
  },
  {
    id: "flowVelocity",
    label: "Flow Velocity",
  },
  {
    id: "arrivalTime",
    label: "Arrival Time",
  },
  {
    id: "maximumDepth",
    label: "Maximum Depth",
  },
  {
    id: "maximumVelocity",
    label: "Maximum Velocity",
  },
];

const AdvancedParameters = ({
  advanced,
  showAdvanced,
  setShowAdvanced,
  updateAdvanced,
  updateOutput,
}) => {
  return (
    <section className="border-t border-slate-200 pt-5">
      {/* Accordion Header */}
      <button
        type="button"
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="flex w-full items-center justify-between text-left"
      >
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Advanced Parameters
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            Technical simulation configuration
          </p>
        </div>

        <svg
          className={`h-4 w-4 text-slate-400 transition-transform ${
            showAdvanced ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19 9-7 7-7-7"
          />
        </svg>
      </button>

      {/* Advanced Content */}
      {showAdvanced && (
        <div className="mt-5 space-y-5">
          {/* Simulation Engine */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-700">
              Simulation Engine
            </label>

            <select
              value={advanced.simulationEngine}
              onChange={(e) =>
                updateAdvanced(
                  "simulationEngine",
                  e.target.value
                )
              }
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="delft3d">Delft3D</option>
              <option value="sph">SPH</option>
              <option value="compare">Compare Both</option>
            </select>
          </div>

          {/* Terrain Resolution */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-700">
              Terrain Resolution
            </label>

            <div className="relative">
              <input
                type="number"
                min="1"
                value={advanced.terrainResolution}
                onChange={(e) =>
                  updateAdvanced(
                    "terrainResolution",
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

          {/* Time Step */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-700">
              Time Step
            </label>

            <select
              value={advanced.timeStep}
              onChange={(e) =>
                updateAdvanced("timeStep", e.target.value)
              }
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="auto">Auto</option>
              <option value="1">1 sec</option>
              <option value="5">5 sec</option>
              <option value="10">10 sec</option>
              <option value="30">30 sec</option>
            </select>
          </div>

          {/* Manning's Roughness */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-700">
              Manning's Roughness
            </label>

            <select
              value={advanced.manningRoughness}
              onChange={(e) =>
                updateAdvanced(
                  "manningRoughness",
                  e.target.value
                )
              }
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="auto">Auto</option>
              <option value="0.025">0.025</option>
              <option value="0.035">0.035</option>
              <option value="0.050">0.050</option>
              <option value="0.070">0.070</option>
            </select>
          </div>

          {/* Initial River Discharge */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-700">
              Initial River Discharge
            </label>

            <div className="relative">
              <input
                type="number"
                min="0"
                placeholder="Auto"
                value={
                  advanced.initialRiverDischarge === "auto"
                    ? ""
                    : advanced.initialRiverDischarge
                }
                onChange={(e) =>
                  updateAdvanced(
                    "initialRiverDischarge",
                    e.target.value === ""
                      ? "auto"
                      : Number(e.target.value)
                  )
                }
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 pr-16 font-mono text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />

              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-slate-400">
                m³/s
              </span>
            </div>
          </div>

          {/* Downstream Boundary */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-700">
              Downstream Boundary
            </label>

            <select
              value={advanced.downstreamBoundary}
              onChange={(e) =>
                updateAdvanced(
                  "downstreamBoundary",
                  e.target.value
                )
              }
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="auto">Auto</option>
              <option value="normal_depth">Normal Depth</option>
              <option value="rating_curve">Rating Curve</option>
            </select>
          </div>

          {/* Rainfall */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-700">
              Additional Rainfall
            </label>

            <select
              value={advanced.rainfall}
              onChange={(e) =>
                updateAdvanced("rainfall", e.target.value)
              }
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="none">None</option>
              <option value="light">Light</option>
              <option value="moderate">Moderate</option>
              <option value="heavy">Heavy</option>
            </select>
          </div>

          {/* Output Interval */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-700">
              Output Interval
            </label>

            <div className="relative">
              <input
                type="number"
                min="1"
                value={advanced.outputInterval}
                onChange={(e) =>
                  updateAdvanced(
                    "outputInterval",
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

          {/* Output Variables */}
          <div className="border-t border-slate-200 pt-4">
            <h4 className="mb-3 text-xs font-medium text-slate-700">
              Output Variables
            </h4>

            <div className="space-y-2.5">
              {outputOptions.map((option) => (
                <label
                  key={option.id}
                  className="flex cursor-pointer items-center gap-3"
                >
                  <input
                    type="checkbox"
                    checked={advanced.outputs[option.id]}
                    onChange={(e) =>
                      updateOutput(
                        option.id,
                        e.target.checked
                      )
                    }
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />

                  <span className="text-sm text-slate-700">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Output Formats */}
          <div className="border-t border-slate-200 pt-4">
            <h4 className="mb-3 text-xs font-medium text-slate-700">
              Output Formats
            </h4>

            <div className="flex flex-wrap gap-2">
              {["GeoJSON", "GeoTIFF", "SHP", "KML"].map(
                (format) => (
                  <span
                    key={format}
                    className="rounded border border-slate-200 bg-slate-50 px-2 py-1 font-mono text-[11px] text-slate-600"
                  >
                    {format}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default AdvancedParameters;