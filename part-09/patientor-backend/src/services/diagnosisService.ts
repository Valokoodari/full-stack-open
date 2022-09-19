import diagnosisData from "../../data/diagnoses.json";
import { Diagnosis } from "../types";

const getDiagnoses = (): Array<Diagnosis> => {
  return diagnosisData;
};

export default {
  getDiagnoses,
};
