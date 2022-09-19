import express from "express";
import patientService from "../services/patientService";
import toNewPatient from "../utils/patientUtils";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  res.send(patientService.getPublicPatients());
});

const parseId = (id: string): string => {
  if (!id || !id.match(/^[0-9a-fA-F-]{36}$/)) {
    throw new Error("invalid id");
  }
  return id;
};

patientRouter.get("/:id", (req: { params: { id: unknown } }, res) => {
  try {
    const id = parseId(req.params.id as string);
    const patient = patientService.getPatient(id);

    if (patient) {
      res.send(patient);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
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
    res.status(400).json({ error: (e as Error).message });
  }
});

export default patientRouter;
