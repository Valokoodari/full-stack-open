import { useState } from "react";
import Select from "react-select";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const UpdateAuthor = ({ authors }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault();

    editAuthor({ variables: { name, born: Number(born) } });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <Select
          defaultValue={name}
          onChange={({ value }) => setName(value)}
          options={authors.map((a) => ({ value: a.name, label: a.name }))}
        />
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default UpdateAuthor;
