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
    <aside className="scrollbar-thin flex max-h-[44rem] w-full shrink-0 flex-col overflow-y-auto rounded-xl border border-[#d5e0e8] bg-[#f8fafb] shadow-[0_8px_24px_rgba(15,45,70,0.05)] lg:max-h-none lg:w-[320px]">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-[#d5e0e8] bg-white px-5 py-5">
        <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#157cad]">
          <span className="h-2 w-2 rounded-full bg-[#157cad]" />
          Scenario builder
        </div>
        <h2 className="text-lg font-semibold tracking-tight text-[#10253a]">
          Simulation configuration
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Define the flood scenario and simulation parameters.
        </p>
      </div>

      <div className="scrollbar-thin flex-1 space-y-4 overflow-y-auto p-3">
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
        <div className="sticky bottom-0 z-10 space-y-2 border-t border-[#d5e0e8] bg-white p-3 shadow-[0_-8px_20px_rgba(15,45,70,0.08)]">
          <button
            type="button"
            onClick={handleRunSimulation}
            disabled={requestState.isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#126ba2] px-4 py-3 text-sm font-semibold text-white shadow-[0_7px_14px_rgba(18,107,162,0.24)] transition hover:-translate-y-0.5 hover:bg-[#0d5684] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
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
              className="rounded-lg border border-[#d5e0e8] bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-[#126ba2]"
            >
              Save Scenario
            </button>

            <button
              type="button"
              onClick={handleLoadScenario}
              className="rounded-lg border border-[#d5e0e8] bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-[#126ba2]"
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