import cors from "cors";
import express from "express";
import diagnosesRouter from "./routes/diagnoses";
import patientRouter from "./routes/patients";
import config from "./utils/config";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientRouter);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
