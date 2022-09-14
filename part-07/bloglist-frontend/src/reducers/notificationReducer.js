import { createSlice } from "@reduxjs/toolkit";

const notificationReducer = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    createNotification(state, action) {
      return action.payload;
    },
    clearNotification(state) {
      return null;
    },
  },
});

export const { createNotification, clearNotification } =
  notificationReducer.actions;

var notificationTimeout = null;

export const setNotification = (message, type = "success", time = 5) => {
  return async (dispatch) => {
    if (notificationTimeout) {
      clearTimeout(notificationTimeout);
    }

    dispatch(createNotification({ message, type }));

    notificationTimeout = setTimeout(() => {
      dispatch(clearNotification());
    }, time * 1000);
  };
};

export default notificationReducer.reducer;
