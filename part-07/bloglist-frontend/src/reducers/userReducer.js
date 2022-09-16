import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const userReducer = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(_, action) {
      return action.payload;
    },
    addBlogToUser(state, action) {
      const user = state.find((user) => user.id === action.payload.id);
      user.blogs = user.blogs.concat(action.payload.blog);
    },
    removeBlogFromUser(state, action) {
      const user = state.find((user) => user.id === action.payload.id);
      user.blogs = user.blogs.filter(
        (blog) => blog.id !== action.payload.blog.id
      );
    },
  },
});

export const { setUsers } = userReducer.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(setUsers(users));
  };
};

export const addBlogToUser = (blog) => {
  return async (dispatch) => {
    dispatch(userReducer.actions.addBlogToUser({ id: blog.user.id, blog }));
  };
};

export const removeBlogFromUser = (blog) => {
  return async (dispatch) => {
    dispatch(
      userReducer.actions.removeBlogFromUser({ id: blog.user.id, blog })
    );
  };
};

export default userReducer.reducer;
