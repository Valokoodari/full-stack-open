import express from "express";
import patientService from "../services/patientService";
import { NewPatient } from "../types";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

patientRouter.post("/", (req, res) => {
  try {
    const newPatient = patientService.addPatient(req.body as NewPatient);
    res.json(newPatient);
  } catch (e: unknown) {
    let errorMessage = "Something went wrong";
    if (e instanceof Error) {
      errorMessage += " Error: " + e.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientRouter;
