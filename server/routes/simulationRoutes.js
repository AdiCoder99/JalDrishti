import express from "express";
import runSimulation, { getSimulation } from "../controllers/simulationController.js";

const router = express.Router();

router.post("/api/simulations", runSimulation);
router.get("/api/simulations/:jobId", getSimulation);

export default router;