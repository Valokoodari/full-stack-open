export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface EntryReqBody extends Express.Request {
  body: {
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
  };
  params: {
    id: unknown;
  };
}

export interface EntryBase {
  id: string;
  date: string;
  type: string;
  specialist: string;
  description: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export interface Discharge {
  criteria: string;
  date: string;
}

export interface HospitalEntry extends EntryBase {
  discharge: Discharge;
  type: "Hospital";
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthcareEntry extends EntryBase {
  type: "OccupationalHealthcare";
  sickLeave?: SickLeave;
  employerName: string;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export interface HealthCheckEntry extends EntryBase {
  healthCheckRating: HealthCheckRating;
  type: "HealthCheck";
}

export type Entry =
  | HospitalEntry
  | HealthCheckEntry
  | OccupationalHealthcareEntry;

export interface PatientReqBody extends Express.Request {
  body: {
    id: unknown;
    ssn: unknown;
    name: unknown;
    gender: unknown;
    occupation: unknown;
    dateOfBirth: unknown;
  };
}

export interface Patient {
  id: string;
  ssn: string;
  name: string;
  gender: Gender;
  occupation: string;
  dateOfBirth: string;
  entries: Entry[];
}

export type PublicPatient = Omit<Patient, "ssn" | "entries">;
