import { useStateValue } from "../state";
import { Entry } from "../types";

import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WorkIcon from "@mui/icons-material/Work";

const EntryDetails = ({ entry }: { entry: Entry }) => {
  const [{ diagnoses }] = useStateValue();

  const style = {
    border: "solid",
    borderWidth: 1,
    padding: 5,
    marginBottom: 5,
    borderRadius: 7,
  };

  switch (entry.type) {
    case "Hospital":
      return (
        <div style={style}>
          {entry.date} <LocalHospitalIcon /> <br />
          <i>{entry.description}</i>
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>
                {code} {diagnoses[code]?.name}
              </li>
            ))}
          </ul>
          {entry.discharge.date} <i>{entry.discharge.criteria}</i> <br />
          diagnose by {entry.specialist}
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div style={style}>
          {entry.date} <WorkIcon /> {entry.employerName} <br />
          <i>{entry.description}</i>
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>
                {code} {diagnoses[code]?.name}
              </li>
            ))}
          </ul>
          {entry.sickLeave ? (
            <p>
              <b>Sick leave:</b> {entry.sickLeave.startDate} –{" "}
              {entry.sickLeave.endDate}
            </p>
          ) : null}
          diagnose by {entry.specialist}
        </div>
      );
    case "HealthCheck":
      return (
        <div style={style}>
          {entry.date} <MedicalServicesIcon /> <br />
          <i>{entry.description}</i>
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>
                {code} {diagnoses[code]?.name}
              </li>
            ))}
          </ul>
          <FavoriteIcon
            sx={{
              color:
                entry.healthCheckRating <= 0
                  ? "green"
                  : entry.healthCheckRating <= 1
                  ? "orange"
                  : "red",
            }}
          />{" "}
          <br />
          diagnose by {entry.specialist}
        </div>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
