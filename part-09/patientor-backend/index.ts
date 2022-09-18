import cors from "cors";
import express from "express";
import diagnosesRouter from "./src/routes/diagnoses";
import config from "./src/utils/config";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
