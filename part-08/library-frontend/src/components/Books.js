import { useEffect, useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { ALL_BOOKS, BOOKS_BY_GENRE } from "../queries";

const Books = ({ show }) => {
  const [genre, setGenre] = useState(null);
  const [getBooks, result] = useLazyQuery(BOOKS_BY_GENRE);
  const books = useQuery(ALL_BOOKS);

  useEffect(() => {
    if (genre) {
      getBooks({ variables: { genre } });
    }
  }, [genre, getBooks]);

  if (books.loading) {
    return <div>loading...</div>;
  }

  const genres = books.data.allBooks
    .map((book) => book.genres)
    .flat()
    .filter((genre, index, array) => array.indexOf(genre) === index);

  return (
    <div>
      <h2>books</h2>
      {genre ? (
        <p>
          in genre <b>{genre}</b>
        </p>
      ) : null}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data
            ? result.data.allBooks.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))
            : books.data.allBooks.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
        </tbody>
      </table>
      <button onClick={() => setGenre(null)}>all genres</button>
      {genres.map((genre) => (
        <button key={genre} onClick={() => setGenre(genre)}>
          {genre}
        </button>
      ))}
    </div>
  );
};

export default Books;
