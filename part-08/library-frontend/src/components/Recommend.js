import { useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { BOOKS_BY_GENRE, ME } from "../queries";

const Recommend = () => {
  const [getBooks, result] = useLazyQuery(BOOKS_BY_GENRE);
  const user = useQuery(ME);

  useEffect(() => {
    if (user.data && user.data.me && user.data.me.favoriteGenre) {
      getBooks({ variables: { genre: user.data.me.favoriteGenre } });
    }
  }, [user, getBooks]);

  if (user.loading || !user.data || !user.data.me) {
    return (
      <div>
        loading...
        <br />
        if this message is shown for more than a few seconds, please refresh the
        page
      </div>
    );
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{user.data.me.favoriteGenre}</b>
      </p>
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
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
