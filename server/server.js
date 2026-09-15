import "dotenv/config";
import express from "express";
import cors from "cors";
import simulationRoutes from "./routes/simulationRoutes.js";
import { closeMongo, getDatabase } from "./db/mongo.js";
const app = express();

app.disable("x-powered-by");
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || true,
  methods: ["GET", "POST", "OPTIONS"],
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ success: true, message: "JalDrishti API is running." });
});

app.get("/api/health", (req, res) => {
  res.json({ success: true, service: "jaldristi-api", status: "healthy" });
});

// Simulation route
app.use("/", simulationRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found.`,
  });
});

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res.status(400).json({
      success: false,
      message: "Request body must contain valid JSON.",
    });
  }

  console.error("Unhandled server error:", error);
  const status = Number.isInteger(error.status) ? error.status : 500;
  return res.status(status).json({
    success: false,
    message: error.message || "Internal server error.",
  });
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  const shutdown = async () => {
    server.close();
    await closeMongo();
  };
  process.once("SIGINT", shutdown);
  process.once("SIGTERM", shutdown);
}

export default app;
