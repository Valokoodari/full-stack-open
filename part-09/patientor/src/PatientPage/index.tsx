import axios from "axios";
import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import EntryDetails from "../components/EntryDetails";
import { addPatient, useStateValue } from "../state";
import AddEntryModal from "../AddEntryModal";
import { Entry, Patient } from "../types";
import { apiBaseUrl } from "../constants";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();

  const [{ patients }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      if (!id) return;

      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addPatient(updatedPatient));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(
          String(e?.response?.data?.error) || "Unrecognized axios error"
        );
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const patient: Patient | undefined = Object.values(patients).find(
    (p: Patient) => p.id === id
  );

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id as string}`
        );
        dispatch(addPatient(patientFromApi));
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
      occupation: {patient.occupation} <br /> <br />
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
      <h3>entries</h3>
      {patient.entries
        ? Object.values(patient.entries).map((entry: Entry) => (
            <EntryDetails key={entry.id} entry={entry} />
          ))
        : null}
    </div>
  );
};

export default PatientPage;
