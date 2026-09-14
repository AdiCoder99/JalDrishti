import { useState } from "react";
import BasicParameters from "./BasicParameters";
import ImpactAnalysis from "./ImpactAnalysis";
import AdvancedParameters from "./AdvancedParameters";
import { useAppContext } from "../../context/useAppContext";

const SimulationConfiguration = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const {
    scenario,
    updateScenario,
    updateImpactLayer,
    updateAdvanced,
    updateOutput,
    runSimulation,
    saveScenario,
    loadScenario,
    requestState,
  } = useAppContext();

  const handleRunSimulation = async () => {
    try {
      await runSimulation();
    } catch {
      // The provider exposes the request error for the UI/API integration.
    }
  };

  const handleSaveScenario = () => {
    saveScenario();
    alert("Scenario saved successfully.");
  };

  const handleLoadScenario = () => {
    try {
      loadScenario();
      alert("Scenario loaded successfully.");
    } catch (error) {
      alert(error.message);
      return;
    }
  };

  return (
    <aside className="w-[320px] shrink-0 overflow-y-auto border-r border-slate-200 bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white px-5 py-4 shadow-sm">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Simulation Configuration
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Define the flood scenario and simulation parameters.
        </p>
      </div>

      <div className="space-y-4 p-4">
        {/* Basic Parameters */}
        <BasicParameters
          scenario={scenario}
          updateScenario={updateScenario}
        />

        {/* Impact Analysis */}
        <ImpactAnalysis
          impactLayers={scenario.impactLayers}
          updateImpactLayer={updateImpactLayer}
        />

        {/* Advanced Parameters */}
        <AdvancedParameters
          advanced={scenario.advanced}
          showAdvanced={showAdvanced}
          setShowAdvanced={setShowAdvanced}
          updateAdvanced={updateAdvanced}
          updateOutput={updateOutput}
        />

        {/* Actions */}
        <div className="fixed bottom-0 left-0 w-[320px] space-y-2 border-t border-slate-200 bg-white p-4 shadow-[0_-6px_20px_rgba(15,23,42,0.08)]">
          <button
            type="button"
            onClick={handleRunSimulation}
            disabled={requestState.isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-blue-200 transition hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
            {requestState.isLoading ? "Running Simulation..." : "Run Simulation"}
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleSaveScenario}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              Save Scenario
            </button>

            <button
              type="button"
              onClick={handleLoadScenario}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              Load Scenario
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default SimulationConfiguration;