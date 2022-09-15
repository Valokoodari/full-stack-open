import { createSlice } from "@reduxjs/toolkit";
import { setNotification } from "./notificationReducer";
import loginService from "../services/login";
import blogService from "../services/blogs";

const loginReducer = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    setUser(_, action) {
      return action.payload;
    },
    removeUser() {
      return null;
    },
  },
});

export const { setUser, removeUser } = loginReducer.actions;

export const initializeLogin = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch(setUser(user));
    }
  };
};

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      dispatch(setNotification(`Logged in as ${user.name}!`, "success"));
    } catch (error) {
      dispatch(setNotification("Wrong username or password", "error"));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedBloglistUser");
    blogService.setToken(null);
    dispatch(removeUser());
    dispatch(setNotification("Logged out successfully!", "success"));
  };
};

export default loginReducer.reducer;
