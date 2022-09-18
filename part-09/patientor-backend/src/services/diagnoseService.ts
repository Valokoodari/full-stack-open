import diagnoseData from "../../data/diagnoses.json";
import { Diagnose } from "../types";

const getDiagnoses = (): Array<Diagnose> => {
  return diagnoseData;
};

export default {
  getDiagnoses,
};
