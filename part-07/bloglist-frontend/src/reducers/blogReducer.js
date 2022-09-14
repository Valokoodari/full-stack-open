import { createSlice } from "@reduxjs/toolkit";
import { setNotification } from "./notificationReducer";
import blogService from "../services/blogs";

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
    updateBlog(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      );
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id);
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

export const updateBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const returnedBlog = await blogService.update(blogObject.id, blogObject);
      dispatch(blogReducer.actions.updateBlog(returnedBlog));
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
};

export const removeBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blogObject.id);
      dispatch(blogReducer.actions.removeBlog(blogObject));
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
  };
};

export default blogReducer.reducer;
