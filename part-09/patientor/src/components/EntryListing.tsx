import { Entry } from "../types";

const EntryListing = ({ entry }: { entry: Entry }) => (
  <div key={entry.id}>
    {entry.date} <i>{entry.description}</i>
    <ul>
      {entry.diagnosisCodes
        ? entry.diagnosisCodes.map((code) => <li key={code}>{code}</li>)
        : null}
    </ul>
  </div>
);

export default EntryListing;
