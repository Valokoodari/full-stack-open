import { isString, parseString, parseDate } from "./parseUtil";
import { Patient, Gender } from "../types";

const isGender = (str: string): str is Gender => {
  return ["male", "female", "other"].includes(str);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const parsePatient = (object: {
  id: unknown;
  ssn: unknown;
  name: unknown;
  gender: unknown;
  occupation: unknown;
  dateOfBirth: unknown;
}): Patient => {
  const newEntry: Patient = {
    id: parseString(object.id),
    ssn: parseString(object.ssn),
    name: parseString(object.name),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation),
    dateOfBirth: parseDate(object.dateOfBirth),
    entries: [],
  };

  return newEntry;
};

export default parsePatient;
