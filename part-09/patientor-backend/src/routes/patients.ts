import express from "express";
import { v4 as uuid } from "uuid";
import { PatientReqBody, EntryReqBody } from "../types";
import patientService from "../services/patientService";
import parsePatient from "../utils/patientUtils";
import parseEntry from "../utils/entryUtil";

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

patientRouter.post("/", (req: PatientReqBody, res) => {
  try {
    const body = req.body;
    body.id = uuid();

    const newPatient = parsePatient(body);

    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e: unknown) {
    res.status(400).json({ error: (e as Error).message });
  }
});

patientRouter.post("/:id/entries", (req: EntryReqBody, res) => {
  try {
    const body = req.body;
    body.id = uuid();

    const newEntry = parseEntry(body);
    const id = parseId(req.params.id as string);

    const updatedPatient = patientService.addEntry(id, newEntry);
    res.json(updatedPatient);
  } catch (e: unknown) {
    res.status(400).json({ error: (e as Error).message });
  }
});

export default patientRouter;
