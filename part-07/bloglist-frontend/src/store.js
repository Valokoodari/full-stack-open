import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import loginReducer from "./reducers/loginReducer";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    users: userReducer,
    user: loginReducer,
  },
});

export default store;
