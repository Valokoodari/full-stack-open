import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { initializeLogin } from "./reducers/loginReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/userReducer";
import Notification from "./components/Notification";
import BlogList from "./components/BlogList";
import UserList from "./components/UserList";
import Header from "./components/Header";
import Login from "./components/Login";
import Blog from "./components/Blog";
import User from "./components/User";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeLogin());
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [dispatch]);

  if (!user) {
    return <Login />;
  }

  return (
    <div className="container">
      <BrowserRouter>
        <div>
          <Header />
          <Notification />
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/blogs/:id" element={<Blog />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/blogs" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
