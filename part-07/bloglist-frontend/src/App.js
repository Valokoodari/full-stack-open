import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initializeLogin } from "./reducers/loginReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/userReducer";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import UserList from "./components/UserList";
import Login from "./components/Login";
import User from "./components/User";

const Home = (user) => (
  <div>
    {user ? (
      <div>
        <BlogForm />
        <BlogList />
      </div>
    ) : null}
  </div>
);

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeLogin());
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div>
        <h1>Bloglist</h1>
        <Notification />
        <Login />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
