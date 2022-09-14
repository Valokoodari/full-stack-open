import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const blogReducer = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      return state.concat(action.payload);
    },
  },
});

export const { setBlogs, appendBlog } = blogReducer.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const returnedBlog = await blogService.create(blogObject);
      dispatch(appendBlog(returnedBlog));
      dispatch(
        setNotification(
          `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`
        )
      );
    } catch (exception) {
      dispatch(
        setNotification(
          `Could not create blog: ${exception.response.data.error}`,
          "error"
        )
      );
    }
  };
};

export default blogReducer.reducer;
