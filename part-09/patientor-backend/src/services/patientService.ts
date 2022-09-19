import { Patient, PublicPatient, Entry } from "../types";
import patientData from "../../data/patients";

const getPublicPatients = (): PublicPatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    gender,
    occupation,
    dateOfBirth,
  }));
};

const getPatient = (id: string): Patient | undefined => {
  return patientData.find((patient) => patient.id === id);
};

const addPatient = (patient: Patient): Patient => {
  patientData.push(patient);
  return patient;
};

const addEntry = (id: string, entry: Entry): Patient => {
  const patient = patientData.find((patient) => patient.id === id);
  if (!patient) {
    throw new Error("Patient not found");
  }

  patient.entries.push(entry);
  return patient;
};

export default {
  getPublicPatients,
  getPatient,
  addPatient,
  addEntry,
};
