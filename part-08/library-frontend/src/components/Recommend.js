import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";

const Recommend = ({ show }) => {
  const result = useQuery(ALL_BOOKS);
  const user = useQuery(ME);

  if (!show) {
    return null;
  }

  if (result.loading || user.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;
  const favoriteGenre = user.data.me.favoriteGenre;

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{favoriteGenre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((book) =>
              favoriteGenre ? book.genres.includes(favoriteGenre) : true
            )
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
