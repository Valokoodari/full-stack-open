import express = require("express");
import { calculateExercises, ExerciseValues } from "./exerciseCalculator";
import { calculateBmi } from "./bmiCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).send({ error: "malformatted parameters" });
  } else {
    res.send({ weight, height, bmi: calculateBmi(height, weight) });
  }
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body as ExerciseValues;

  if (!daily_exercises || !target) {
    res.status(400).send({ error: "parameters missing" });
  } else if (isNaN(target) || !Array.isArray(daily_exercises) || daily_exercises.some(isNaN)) {
    res.status(400).send({ error: "malformatted parameters" });
  } else {
    res.send(calculateExercises(daily_exercises, target));
  }
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
