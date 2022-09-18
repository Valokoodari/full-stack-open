import { v1 as uuid } from "uuid";
import { Patient, NewPatient, NonSensitivePatient } from "../types";
import patientData from "../../data/patients";

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...patient,
  };

  patientData.push(newPatient);
  return newPatient;
};

export default {
  getNonSensitivePatients,
  addPatient,
};
