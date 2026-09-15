import axios from "axios";

const pythonBaseUrl = process.env.SIMULATION_ENGINE_URL || "http://127.0.0.1:8000";
const pythonClient = axios.create({
  baseURL: pythonBaseUrl,
  timeout: 15000,
});

const startSimulation = async (scenario) => {
  const response = await pythonClient.post("/simulation/sph/run", scenario);
  return response.data;
};

const getSimulationStatus = async (pythonJobId) => {
  const response = await pythonClient.get(`/simulation/status/${encodeURIComponent(pythonJobId)}`);
  return response.data;
};

const getSimulationResult = async (pythonJobId) => {
  const response = await pythonClient.get(`/simulation/result/${encodeURIComponent(pythonJobId)}`);
  return response.data;
};

export { getSimulationResult, getSimulationStatus, startSimulation };
