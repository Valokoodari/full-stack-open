import { useEffect, useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { ALL_BOOKS, BOOKS_BY_GENRE } from "../queries";

const Books = () => {
  const [genre, setGenre] = useState(null);
  const [getBooks, result] = useLazyQuery(BOOKS_BY_GENRE);
  const [genres, setGenres] = useState([]);
  const books = useQuery(ALL_BOOKS);

  useEffect(() => {
    if (genre) {
      getBooks({
        variables: { genre },
        fetchPolicy: "cache-and-network", // update the cache when a genre is selected
      });
    }
  }, [genre, getBooks]);

  // Update the cache when all genres is selected
  useEffect(() => {
    if (result.data) {
      books.refetch();
    }
  }, [genre, result.data, books]);

  // Also update the genres list when new books are added or removed
  useEffect(() => {
    if (books.data) {
      const genres = books.data.allBooks
        .map((book) => book.genres)
        .flat()
        .filter((genre, index, self) => self.indexOf(genre) === index);
      setGenres(genres);
    }
  }, [books.data]);

  if (books.loading) {
    return <div>loading...</div>;
  }

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
          {result.data && genre
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
