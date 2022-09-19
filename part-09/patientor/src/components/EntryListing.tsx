import { useStateValue } from "../state";
import { Entry } from "../types";

const EntryListing = ({ entry }: { entry: Entry }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <div key={entry.id}>
      {entry.date} <i>{entry.description}</i>
      <ul>
        {entry.diagnosisCodes
          ? entry.diagnosisCodes.map((code) => (
              <li key={code}>
                {code} {diagnoses && diagnoses[code] && diagnoses[code].name}
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default EntryListing;
