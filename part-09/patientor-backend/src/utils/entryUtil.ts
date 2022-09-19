import { parseString, parseDate, parseStrings, parseNumber } from "./parseUtil";
import { Discharge, Entry, SickLeave } from "../types";

const parseDischarge = (discharge: unknown): Discharge => {
  if (
    !discharge ||
    typeof discharge !== "object" ||
    !("date" in discharge) ||
    !("criteria" in discharge)
  ) {
    throw new Error("Incorrect or missing discharge: " + discharge);
  }

  const dischargeObject = discharge as Discharge;

  return {
    date: parseDate(dischargeObject.date),
    criteria: parseString(dischargeObject.criteria),
  };
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (
    !sickLeave ||
    typeof sickLeave !== "object" ||
    !("startDate" in sickLeave) ||
    !("endDate" in sickLeave)
  ) {
    throw new Error("Incorrect or missing sick leave: " + sickLeave);
  }

  const sickLeaveObject = sickLeave as SickLeave;

  return {
    startDate: parseDate(sickLeaveObject.startDate),
    endDate: parseDate(sickLeaveObject.endDate),
  };
};

const parseEntry = (object: {
  id: unknown;
  date: unknown;
  type: unknown;
  specialist: unknown;
  description: unknown;
  diagnosisCodes: unknown;
  healthCheckRating?: unknown;
  employerName?: unknown;
  discharge?: unknown;
  sickLeave?: unknown;
}): Entry => {
  const commonFields = {
    id: parseString(object.id),
    date: parseDate(object.date),
    type: parseString(object.type),
    specialist: parseString(object.specialist),
    diagnosisCodes: parseStrings(object.diagnosisCodes),
    description: parseString(object.description),
  };

  switch (object.type) {
    case "Hospital":
      return {
        ...commonFields,
        type: "Hospital",
        discharge: parseDischarge(object.discharge),
      };
    case "OccupationalHealthcare":
      return {
        ...commonFields,
        type: "OccupationalHealthcare",
        employerName: parseString(object.employerName),
        sickLeave: object.sickLeave
          ? parseSickLeave(object.sickLeave)
          : undefined,
      };
    case "HealthCheck":
      return {
        ...commonFields,
        type: "HealthCheck",
        healthCheckRating: parseNumber(object.healthCheckRating),
      };
    default:
      throw new Error("Incorrect or missing type: " + object.type);
  }
};

export default parseEntry;
