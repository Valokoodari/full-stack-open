import express from "express";
import patientService from "../services/patientService";
import toNewPatient from "../utils/patientUtils";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

interface PatientReqBody extends Express.Request {
  body: {
    name: unknown;
    dateOfBirth: unknown;
    ssn: unknown;
    gender: unknown;
    occupation: unknown;
  };
}

patientRouter.post("/", (req: PatientReqBody, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e: unknown) {
    let errorMessage = "Something went wrong";
    if (e instanceof Error) {
      errorMessage += " Error: " + e.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientRouter;
