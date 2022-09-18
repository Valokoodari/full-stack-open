import { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/client";
import Notifications from "./components/Notifications";
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

  const login = (token) => {
    setPage("authors");
    setToken(token);
    localStorage.setItem("library-user-token", token);
  };

  const logout = () => {
    setPage("authors");
    setToken(null);
    localStorage.clear();
    client.resetStore();
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

      <Notifications client={client} />

      {
        {
          authors: <Authors logged={!!token} />,
          books: <Books />,
          add: <NewBook />,
          recommend: <Recommend />,
          login: <Login handleLogin={login} />,
        }[page]
      }
    </div>
  );
};

export default App;
