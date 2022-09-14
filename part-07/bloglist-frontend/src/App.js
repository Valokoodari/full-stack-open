import { useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import loginService from "./services/login";
import blogService from "./services/blogs";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUserJSON = window.localStorage.getItem("currentBloglistUser");
    if (currentUserJSON) {
      const user = JSON.parse(currentUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      dispatch(setNotification(`Logged in as ${user.name}`));
      window.localStorage.setItem("currentBloglistUser", JSON.stringify(user));
      blogService.setToken(user.token);
      loginFormRef.current.clearForm();
      setUser(user);
    } catch (exception) {
      dispatch(setNotification("Wrong username or password", "error"));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("currentBloglistUser");
    blogService.setToken(null);
    setUser(null);
    dispatch(setNotification("Logged out successfully!"));
  };

  const loginFormRef = useRef();

  return (
    <div>
      <h1>Bloglist</h1>
      <Notification />
      {user === null ? (
        <div>
          <LoginForm handleLogin={handleLogin} ref={loginFormRef} />
        </div>
      ) : (
        <div>
          <div>
            Logged in as {user.name}{" "}
            <button onClick={handleLogout}>logout</button>
          </div>
          <BlogForm />
          <BlogList user={user} />
        </div>
      )}
    </div>
  );
};

export default App;
