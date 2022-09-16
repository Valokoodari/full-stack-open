import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { login } from "../reducers/loginReducer";
import Notification from "./Notification";

const Login = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.classList.add("login-background");
    return () => {
      document.body.classList.remove("login-background");
    };
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(login({ username, password }));
    setUsername("");
    setPassword("");
  };

  return (
    <div className="container" id="login">
      <div className="row justify-content-center align-items-center">
        <div className="col-12 col-md-6">
          <div className="mx-auto p-5 border rounded shadow bg-light mt-5">
            <h2 className="mb-3">Log in to Bloglist</h2>
            <Notification />
            <Form onSubmit={handleLogin}>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
                />
                <Form.Label className="mt-3">Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mt-4"
                  style={{ fontSize: "1.2em" }}
                >
                  login
                </Button>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
