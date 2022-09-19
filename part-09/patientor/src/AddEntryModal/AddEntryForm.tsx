import { useState } from "react";
import { Grid, Button, Select, MenuItem, TextField } from "@material-ui/core";
import { Entry } from "../types";

export type EntryFormValues = Partial<Entry>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

interface TypeOption {
  value: string;
  label: string;
}

const typeOptions: TypeOption[] = [
  { value: "Hospital", label: "Hospital" },
  { value: "HealthCheck", label: "Health check" },
  { value: "OccupationalHealthcare", label: "Occupational healthcare" },
];

interface HealthCheckRatingOption {
  value: number;
  label: string;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: 0, label: "Healthy" },
  { value: 1, label: "Low risk" },
  { value: 2, label: "High risk" },
  { value: 3, label: "Critical risk" },
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const fieldStyle = { marginBottom: "1em" };

  // Base values for all types
  const [type, setType] = useState("Hospital");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  // Hospital values
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  // HealthCheck values
  const [healthCheckRating, setHealthCheckRating] = useState(0);

  // OccupationalHealthcare values
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newType = type as Entry["type"];

    switch (newType) {
      case "Hospital":
        onSubmit({
          type: newType,
          description,
          date,
          specialist,
          diagnosisCodes,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        });
        break;
      case "HealthCheck":
        onSubmit({
          type: newType,
          description,
          date,
          specialist,
          diagnosisCodes,

          healthCheckRating,
        });
        break;
      case "OccupationalHealthcare":
        onSubmit({
          type: newType,
          description,
          date,
          specialist,
          diagnosisCodes,
          employerName,
          sickLeave: {
            startDate: sickLeaveStartDate,
            endDate: sickLeaveEndDate,
          },
        });
        break;
      default:
        break;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Select
        fullWidth
        name="type"
        label="Type"
        value={type}
        style={{ ...fieldStyle, marginTop: "1em" }}
        onChange={(e) => setType(e.target.value as string)}
      >
        {typeOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <TextField
        fullWidth
        name="description"
        style={fieldStyle}
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        fullWidth
        name="date"
        style={fieldStyle}
        label="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <TextField
        fullWidth
        name="specialist"
        style={fieldStyle}
        label="Specialist"
        value={specialist}
        onChange={(e) => setSpecialist(e.target.value)}
      />
      <TextField
        fullWidth
        name="diagnosisCodes"
        style={fieldStyle}
        label="Diagnosis codes"
        value={diagnosisCodes}
        onChange={(e) => setDiagnosisCodes(e.target.value.split(","))}
      />

      {type === "Hospital" && (
        <>
          <TextField
            fullWidth
            name="dischargeDate"
            style={fieldStyle}
            label="Discharge date"
            value={dischargeDate}
            onChange={(e) => setDischargeDate(e.target.value)}
          />
          <TextField
            fullWidth
            name="dischargeCriteria"
            style={fieldStyle}
            label="Discharge criteria"
            value={dischargeCriteria}
            onChange={(e) => setDischargeCriteria(e.target.value)}
          />
        </>
      )}

      {type === "HealthCheck" && (
        <Select
          fullWidth
          name="healthCheckRating"
          label="Health check rating"
          value={healthCheckRating}
          style={fieldStyle}
          onChange={(e) => setHealthCheckRating(e.target.value as number)}
        >
          {healthCheckRatingOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      )}

      {type === "OccupationalHealthcare" && (
        <>
          <TextField
            fullWidth
            name="employerName"
            style={fieldStyle}
            label="Employer name"
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
          />
          <TextField
            fullWidth
            name="sickLeaveStartDate"
            style={fieldStyle}
            label="Sick leave start date"
            value={sickLeaveStartDate}
            onChange={(e) => setSickLeaveStartDate(e.target.value)}
          />
          <TextField
            fullWidth
            name="sickLeaveEndDate"
            style={fieldStyle}
            label="Sick leave end date"
            value={sickLeaveEndDate}
            onChange={(e) => setSickLeaveEndDate(e.target.value)}
          />
        </>
      )}

      <Grid>
        <Grid item>
          <Button
            type="button"
            onClick={onCancel}
            color="secondary"
            variant="contained"
            style={{ float: "left" }}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button
            style={{
              float: "right",
            }}
            type="submit"
            variant="contained"
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddEntryForm;
