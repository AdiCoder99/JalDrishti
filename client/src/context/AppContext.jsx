import { useEffect, useState } from "react";
import { affectedAssets as defaultAffectedAssets, keyResults as defaultKeyResults } from "../Components/Results/resultsData";
import { AppContext } from "./context";

const initialScenario = {
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
};

const initialMapLayers = {
    floodExtent: true,
    waterDepth: false,
    flowVelocity: false,
    riverNetwork: true,
    damLocation: true,
    settlements: false,
    baseMap: "osm",
};

const cloneScenario = () => structuredClone(initialScenario);

export const AppProvider = ({ children }) => {
    const [scenario, setScenario] = useState(cloneScenario);
    const [mapLayers, setMapLayers] = useState(initialMapLayers);
    const [activeMapView, setActiveMapView] = useState("Flood Extent");
    const [timelineTime, setTimelineTime] = useState(108);
    const [isTimelinePlaying, setIsTimelinePlaying] = useState(false);
    const [results, setResults] = useState({
        keyResults: defaultKeyResults,
        affectedAssets: defaultAffectedAssets,
    });
    const [requestState, setRequestState] = useState({
        isLoading: false,
        error: null,
    });

    const timelineDuration = scenario.simulationDuration * 60;

    useEffect(() => {
        if (!isTimelinePlaying) {
            return undefined;
        }

        const interval = window.setInterval(() => {
            setTimelineTime((currentTime) => {
                if (currentTime >= timelineDuration) {
                    setIsTimelinePlaying(false);
                    return timelineDuration;
                }
                return currentTime + 1;
            });
        }, 1000);

        return () => window.clearInterval(interval);
    }, [isTimelinePlaying, timelineDuration]);

    const updateScenario = (field, value) => {
        setScenario((currentScenario) => ({
            ...currentScenario,
            [field]: value,
        }));
    };

    const updateImpactLayer = (field, value) => {
        setScenario((currentScenario) => ({
            ...currentScenario,
            impactLayers: {
                ...currentScenario.impactLayers,
                [field]: value,
            },
        }));
    };

    const updateAdvanced = (field, value) => {
        setScenario((currentScenario) => ({
            ...currentScenario,
            advanced: {
                ...currentScenario.advanced,
                [field]: value,
            },
        }));
    };

    const updateOutput = (field, value) => {
        setScenario((currentScenario) => ({
            ...currentScenario,
            advanced: {
                ...currentScenario.advanced,
                outputs: {
                    ...currentScenario.advanced.outputs,
                    [field]: value,
                },
            },
        }));
    };

    const toggleMapLayer = (layer) => {
        setMapLayers((currentLayers) => ({
            ...currentLayers,
            [layer]: !currentLayers[layer],
        }));
    };

    const changeBaseMap = (baseMap) => {
        setMapLayers((currentLayers) => ({ ...currentLayers, baseMap }));
    };

    const setTimelineTimeSafe = (time) => {
        setTimelineTime(Math.min(Math.max(time, 0), timelineDuration));
    };

    const toggleTimelinePlayback = () => {
        if (timelineTime >= timelineDuration) {
            setTimelineTime(0);
        }
        setIsTimelinePlaying((playing) => !playing);
    };

    const request = async (path, options = {}) => {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
        const response = await fetch(`${baseUrl}${path}`, {
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        return response.status === 204 ? null : response.json();
    };

    const runSimulation = async () => {
        setRequestState({ isLoading: true, error: null });
        try {
            const data = await request("/api/simulations", {
                method: "POST",
                body: JSON.stringify(scenario),
            });
            if (data?.results) {
                setResults(data.results);
            }
            return data;
        } catch (error) {
            setRequestState({ isLoading: false, error: error.message });
            throw error;
        } finally {
            setRequestState((currentState) => ({ ...currentState, isLoading: false }));
        }
    };

    const saveScenario = () => {
        localStorage.setItem("jaldristiScenario", JSON.stringify(scenario));
    };

    const loadScenario = () => {
        const savedScenario = localStorage.getItem("jaldristiScenario");
        if (!savedScenario) {
            throw new Error("No saved scenario found.");
        }
        setScenario(JSON.parse(savedScenario));
    };

    const value = {
        scenario,
        updateScenario,
        updateImpactLayer,
        updateAdvanced,
        updateOutput,
        mapLayers,
        toggleMapLayer,
        changeBaseMap,
        activeMapView,
        setActiveMapView,
        timelineTime,
        timelineDuration,
        isTimelinePlaying,
        setTimelineTime: setTimelineTimeSafe,
        toggleTimelinePlayback,
        results,
        apiRequest: request,
        runSimulation,
        saveScenario,
        loadScenario,
        requestState,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
