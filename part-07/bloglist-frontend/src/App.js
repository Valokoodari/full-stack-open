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

  const updateBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.update(blogObject.id, blogObject);
      // setBlogs(
      //   blogs.map((blog) => (blog.id === returnedBlog.id ? returnedBlog : blog))
      // );
      dispatch(
        setNotification(
          `Blog ${returnedBlog.title} by ${returnedBlog.author} updated.`
        )
      );
    } catch (exception) {
      dispatch(
        setNotification(
          `Could not update blog: ${exception.response.data.error}`,
          "error"
        )
      );
    }
  };

  const removeBlog = async (blogObject) => {
    if (
      window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)
    ) {
      try {
        await blogService.remove(blogObject.id);
        // setBlogs(blogs.filter((blog) => blog.id !== blogObject.id));
        dispatch(
          setNotification(
            `Blog ${blogObject.title} by ${blogObject.author} removed.`
          )
        );
      } catch (exception) {
        dispatch(
          setNotification(
            `Could not remove blog: ${exception.response.data.error}`,
            "error"
          )
        );
      }
    }
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
          <BlogList
            updateBlog={updateBlog}
            removeBlog={removeBlog}
            user={user}
          />
        </div>
      )}
    </div>
  );
};

export default App;
