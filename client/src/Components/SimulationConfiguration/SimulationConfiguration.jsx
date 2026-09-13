import { useState } from "react";
import BasicParameters from "./BasicParameters";
import ImpactAnalysis from "./ImpactAnalysis";
import AdvancedParameters from "./AdvancedParameters";

const SimulationConfiguration = () => {
  const [scenario, setScenario] = useState({
    dam: "tehri",
    scenarioType: "dam_break",
    reservoirLevel: 815,
    breachWidth: 100,
    breachFormationTime: 30,
    simulationDuration: 6,

    impactLayers: {
      settlements: true,
      roads: true,
      buildings: true,
      bridges: false,
      criticalInfrastructure: false,
    },

    advanced: {
      simulationEngine: "delft3d",
      terrainResolution: 30,
      timeStep: "auto",
      manningRoughness: "auto",
      initialRiverDischarge: "auto",
      downstreamBoundary: "auto",
      rainfall: "none",
      outputInterval: 10,

      outputs: {
        floodExtent: true,
        waterDepth: true,
        flowVelocity: true,
        arrivalTime: true,
        maximumDepth: true,
        maximumVelocity: true,
      },
    },
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateScenario = (field, value) => {
    setScenario((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateImpactLayer = (field, value) => {
    setScenario((prev) => ({
      ...prev,
      impactLayers: {
        ...prev.impactLayers,
        [field]: value,
      },
    }));
  };

  const updateAdvanced = (field, value) => {
    setScenario((prev) => ({
      ...prev,
      advanced: {
        ...prev.advanced,
        [field]: value,
      },
    }));
  };

  const updateOutput = (field, value) => {
    setScenario((prev) => ({
      ...prev,
      advanced: {
        ...prev.advanced,
        outputs: {
          ...prev.advanced.outputs,
          [field]: value,
        },
      },
    }));
  };

  const handleRunSimulation = () => {
    console.log("Simulation payload:", scenario);

    // Later:
    // fetch("/api/simulations", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(scenario),
    // });
  };

  const handleSaveScenario = () => {
    localStorage.setItem("jaldristiScenario", JSON.stringify(scenario));
    alert("Scenario saved successfully.");
  };

  const handleLoadScenario = () => {
    const savedScenario = localStorage.getItem("jaldristiScenario");

    if (!savedScenario) {
      alert("No saved scenario found.");
      return;
    }

    setScenario(JSON.parse(savedScenario));
  };

  return (
    <aside className="w-[320px] shrink-0 border-r border-slate-200 bg-white overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white px-5 py-4">
        <h2 className="text-xl font-semibold text-slate-900">
          Simulation Configuration
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Define the flood scenario and simulation parameters.
        </p>
      </div>

      <div className="space-y-6 p-5">
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
        <div className="space-y-2 border-t border-slate-200 pt-5">
          <button
            type="button"
            onClick={handleRunSimulation}
            className="flex w-full items-center justify-center rounded-md bg-[#2563EB] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Run Simulation
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleSaveScenario}
              className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            >
              Save Scenario
            </button>

            <button
              type="button"
              onClick={handleLoadScenario}
              className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
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