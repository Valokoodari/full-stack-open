import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = ({ show }) => {
  const result = useQuery(ALL_BOOKS);
  const [genre, setGenre] = useState(null);

  if (!show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;

  return (
    <div>
      <h2>books</h2>
      {genre ? (
        <div>
          in genre <b>{genre}</b>
        </div>
      ) : null}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((book) => (genre ? book.genres.includes(genre) : true))
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setGenre(null)}>all genres</button>
        {books
          .map((a) => a.genres)
          .reduce((a, b) => a.concat(b), [])
          .filter((a, i, arr) => arr.indexOf(a) === i)
          .map((a) => (
            <button key={a} onClick={() => setGenre(a)}>
              {a}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Books;
