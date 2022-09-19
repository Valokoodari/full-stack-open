import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Patient } from "../types";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();

  const [{ patients }, dispatch] = useStateValue();

  const patient: Patient | undefined = Object.values(patients).find(
    (p: Patient) => p.id === id
  );

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id as string}`
        );
        dispatch({ type: "ADD_PATIENT", payload: patientFromApi });
      } catch (e) {
        console.error(e);
      }
    };
    if (!patient || !patient.ssn) {
      void fetchPatient();
    }
  }, [dispatch, id, patient]);

  if (!patient) {
    return null;
  }

  return (
    <div>
      <h2>
        {patient.name}
        {patient && patient.gender === "female" ? (
          <FemaleIcon />
        ) : patient.gender === "male" ? (
          <MaleIcon />
        ) : null}
      </h2>
      ssn: {patient.ssn} <br />
      occupation: {patient.occupation}
    </div>
  );
};

export default PatientPage;
