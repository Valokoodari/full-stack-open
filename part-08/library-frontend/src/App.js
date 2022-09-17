import { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/client";
import Recommend from "./components/Recommend";
import Authors from "./components/Authors";
import NewBook from "./components/NewBook";
import Books from "./components/Books";
import Login from "./components/Login";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("library-user-token");
    if (token) {
      setToken(token);
    }
  }, []);

  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("authors");
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? null : <button onClick={() => setPage("login")}>login</button>}
        {token ? (
          <button onClick={() => setPage("add")}>add book</button>
        ) : null}
        {token ? (
          <button onClick={() => setPage("recommend")}>recommend</button>
        ) : null}
        {token ? <button onClick={() => logout()}>logout</button> : null}
      </div>

      <Books show={page === "books"} />
      <NewBook show={page === "add"} />
      <Recommend show={page === "recommend"} />
      <Authors show={page === "authors"} logged={!!token} />
      <Login show={page === "login"} setToken={setToken} setPage={setPage} />
    </div>
  );
};

export default App;
