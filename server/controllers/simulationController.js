const allowedValues = {
    dam: ["tehri", "bhakra", "hirakud"],
    scenarioType: ["dam_break", "sudden_release", "river_blockage"],
    simulationEngine: ["delft3d", "hec_ras", "lisflood"],
    timeStep: ["auto", "1", "5", "10", "30"],
    manningRoughness: ["auto", "low", "medium", "high"],
    initialRiverDischarge: ["auto", "low", "medium", "high"],
    downstreamBoundary: ["auto", "normal_depth", "rating_curve", "open"],
    rainfall: ["none", "light", "moderate", "heavy"],
};

const requiredImpactLayers = [
    "settlements",
    "roads",
    "buildings",
    "bridges",
    "criticalInfrastructure",
];

const requiredOutputs = [
    "floodExtent",
    "waterDepth",
    "flowVelocity",
    "arrivalTime",
    "maximumDepth",
    "maximumVelocity",
];

const isFiniteNumber = (value) =>
    typeof value === "number" && Number.isFinite(value);

const addError = (errors, condition, path, message) => {
    if (!condition) {
        errors.push({ path, message });
    }
};

const validateScenario = (scenario) => {
    const errors = [];
    const isObject = scenario !== null && typeof scenario === "object" && !Array.isArray(scenario);

    if (!isObject) {
        return [{ path: "body", message: "Scenario must be a JSON object." }];
    }

    addError(errors, allowedValues.dam.includes(scenario.dam), "dam", "Unsupported dam.");
    addError(
        errors,
        allowedValues.scenarioType.includes(scenario.scenarioType),
        "scenarioType",
        "Unsupported scenario type.",
    );
    addError(
        errors,
        isFiniteNumber(scenario.reservoirLevel) && scenario.reservoirLevel > 0,
        "reservoirLevel",
        "Reservoir level must be a number greater than 0.",
    );
    addError(
        errors,
        isFiniteNumber(scenario.breachWidth) && scenario.breachWidth >= 0,
        "breachWidth",
        "Breach width must be a number greater than or equal to 0.",
    );
    addError(
        errors,
        isFiniteNumber(scenario.breachFormationTime) && scenario.breachFormationTime >= 1,
        "breachFormationTime",
        "Breach formation time must be at least 1 minute.",
    );
    addError(
        errors,
        isFiniteNumber(scenario.simulationDuration) && scenario.simulationDuration >= 1,
        "simulationDuration",
        "Simulation duration must be at least 1 hour.",
    );

    const impactLayers = scenario.impactLayers;
    addError(
        errors,
        impactLayers !== null && typeof impactLayers === "object" && !Array.isArray(impactLayers),
        "impactLayers",
        "Impact layers must be an object.",
    );
    if (impactLayers && typeof impactLayers === "object") {
        requiredImpactLayers.forEach((field) => {
            addError(errors, typeof impactLayers[field] === "boolean", `impactLayers.${field}`, "Value must be boolean.");
        });
    }

    const advanced = scenario.advanced;
    addError(
        errors,
        advanced !== null && typeof advanced === "object" && !Array.isArray(advanced),
        "advanced",
        "Advanced parameters must be an object.",
    );
    if (advanced && typeof advanced === "object") {
        addError(errors, allowedValues.simulationEngine.includes(advanced.simulationEngine), "advanced.simulationEngine", "Unsupported simulation engine.");
        addError(errors, allowedValues.timeStep.includes(String(advanced.timeStep)), "advanced.timeStep", "Unsupported time step.");
        addError(errors, allowedValues.manningRoughness.includes(advanced.manningRoughness), "advanced.manningRoughness", "Unsupported Manning roughness.");
        addError(errors, allowedValues.initialRiverDischarge.includes(advanced.initialRiverDischarge), "advanced.initialRiverDischarge", "Unsupported initial river discharge.");
        addError(errors, allowedValues.downstreamBoundary.includes(advanced.downstreamBoundary), "advanced.downstreamBoundary", "Unsupported downstream boundary.");
        addError(errors, allowedValues.rainfall.includes(advanced.rainfall), "advanced.rainfall", "Unsupported rainfall option.");
        addError(errors, isFiniteNumber(advanced.terrainResolution) && advanced.terrainResolution > 0, "advanced.terrainResolution", "Terrain resolution must be greater than 0.");
        addError(errors, isFiniteNumber(advanced.outputInterval) && advanced.outputInterval > 0, "advanced.outputInterval", "Output interval must be greater than 0.");
        addError(errors, advanced.outputs !== null && typeof advanced.outputs === "object" && !Array.isArray(advanced.outputs), "advanced.outputs", "Outputs must be an object.");
        if (advanced.outputs && typeof advanced.outputs === "object") {
            requiredOutputs.forEach((field) => {
                addError(errors, typeof advanced.outputs[field] === "boolean", `advanced.outputs.${field}`, "Value must be boolean.");
            });
        }
    }

    return errors;
};

const round = (value, decimals = 1) => Number(value.toFixed(decimals));

const calculateResults = (scenario) => {
    const damFactor = { tehri: 1, bhakra: 1.12, hirakud: 0.88 }[scenario.dam];
    const typeFactor = { dam_break: 1, sudden_release: 0.78, river_blockage: 0.62 }[scenario.scenarioType];
    const breachFactor = Math.max(0.25, Math.min(2, scenario.breachWidth / 100));
    const durationFactor = Math.max(0.5, Math.min(1.5, scenario.simulationDuration / 6));
    const levelFactor = Math.max(0.5, Math.min(1.4, scenario.reservoirLevel / 815));
    const rainfallFactor = { none: 1, light: 1.08, moderate: 1.18, heavy: 1.32 }[scenario.advanced.rainfall];
    const severity = damFactor * typeFactor * breachFactor * durationFactor * levelFactor * rainfallFactor;
    const layers = scenario.impactLayers;

    const area = 137.4 * severity;
    const depth = 11.4 * Math.sqrt(severity);
    const velocity = 6.2 * Math.pow(severity, 0.35);
    const arrival = Math.max(5, 42 / Math.max(0.5, severity));
    const assetValues = {
        Villages: Math.round(47 * severity * (layers.settlements ? 1 : 0)),
        Buildings: Math.round(2341 * severity * (layers.buildings ? 1 : 0)),
        Roads: Math.round(83 * severity * (layers.roads ? 1 : 0)),
        Bridges: Math.round(12 * severity * (layers.bridges ? 1 : 0)),
        Population: Math.round(180000 * severity * (layers.settlements ? 1 : 0)),
    };

    return {
        keyResults: [
            { label: "Inundated Area", value: round(area), unit: "km²" },
            { label: "Maximum Depth", value: round(depth), unit: "m" },
            { label: "Maximum Velocity", value: round(velocity), unit: "m/s" },
            { label: "Flood Arrival", value: round(arrival), unit: "min" },
        ],
        affectedAssets: [
            { type: "Villages", affected: String(assetValues.Villages), unit: "villages" },
            { type: "Buildings", affected: assetValues.Buildings.toLocaleString("en-IN"), unit: "buildings" },
            { type: "Roads", affected: String(assetValues.Roads), unit: "km" },
            { type: "Bridges", affected: String(assetValues.Bridges), unit: "bridges" },
            { type: "Population", affected: `${round(assetValues.Population / 100000, 1)} L`, unit: "people" },
        ],
    };
};

const normalizePythonResult = (simulation) => ({
    keyResults: [
        { label: "Inundated Area", value: simulation.water_front_m, unit: "m" },
        { label: "Maximum Depth", value: simulation.particle_height_m, unit: "m" },
        { label: "Maximum Velocity", value: simulation.velocity_p95_mps, unit: "m/s" },
        { label: "Flood Arrival", value: simulation.simulation_time_s, unit: "s" },
    ],
    affectedAssets: [
        { type: "Villages", affected: "0", unit: "villages" },
        { type: "Buildings", affected: "0", unit: "buildings" },
        { type: "Roads", affected: "0", unit: "km" },
        { type: "Bridges", affected: "0", unit: "bridges" },
        { type: "Population", affected: "0 L", unit: "people" },
    ],
});

const runSimulation = async (req, res, next) => {
    const validationErrors = validateScenario(req.body);
    if (validationErrors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid simulation scenario.",
            errors: validationErrors,
        });
    }

    try {
        const jobs = await getJobsCollection();
        const jobId = new ObjectId();
        await jobs.insertOne({
            _id: jobId,
            status: "starting",
            scenario: req.body,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        try {
            const pythonJob = await startSimulation(req.body);
            await jobs.updateOne(
                { _id: jobId },
                {
                    $set: {
                        status: "running",
                        pythonJobId: pythonJob.job_id,
                        updatedAt: new Date(),
                    },
                },
            );

            return res.status(202).json({
                success: true,
                message: "Simulation accepted by the simulation engine.",
                jobId: jobId.toHexString(),
                pythonJobId: pythonJob.job_id,
                status: "running",
            });
        } catch (error) {
            await jobs.updateOne(
                { _id: jobId },
                {
                    $set: {
                        status: "failed",
                        error: error.response?.data?.detail || error.message,
                        updatedAt: new Date(),
                    },
                },
            );
            throw error;
        }
    } catch (error) {
        return next(error);
    }
};

const getSimulation = async (req, res, next) => {
    if (!ObjectId.isValid(req.params.jobId)) {
        return res.status(400).json({ success: false, message: "Invalid job ID." });
    }

    try {
        const jobs = await getJobsCollection();
        const job = await jobs.findOne({ _id: new ObjectId(req.params.jobId) });
        if (!job) {
            return res.status(404).json({ success: false, message: "Simulation job not found." });
        }

        if (!job.pythonJobId) {
            return res.status(500).json({
                success: false,
                message: "Simulation engine job ID is missing.",
                status: job.status,
            });
        }

        const pythonStatus = await getSimulationStatus(job.pythonJobId);
        const updates = {
            status: pythonStatus.status,
            updatedAt: new Date(),
            pythonStatus,
        };

        if (pythonStatus.status === "completed") {
            const simulation = await getSimulationResult(job.pythonJobId);
            updates.result = simulation;
            updates.results = normalizePythonResult(simulation);
        }
        if (pythonStatus.status === "failed") {
            updates.error = pythonStatus.error || pythonStatus.metrics_error || "Simulation failed.";
        }

        await jobs.updateOne({ _id: job._id }, { $set: updates });
        const response = {
            success: pythonStatus.status !== "failed",
            jobId: job._id.toHexString(),
            status: pythonStatus.status,
            pythonJobId: job.pythonJobId,
        };
        if (updates.results) {
            response.results = updates.results;
            response.simulation = updates.result;
        }
        if (updates.error) {
            response.error = updates.error;
        }
        return res.status(200).json(response);
    } catch (error) {
        return next(error);
    }
};

export { calculateResults, getSimulation, normalizePythonResult, runSimulation, validateScenario };
export default runSimulation;
import { ObjectId } from "mongodb";
import { getJobsCollection } from "../db/mongo.js";
import {
    getSimulationResult,
    getSimulationStatus,
    startSimulation,
} from "../services/pythonSimulationClient.js";
