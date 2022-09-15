import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const userReducer = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(_, action) {
      return action.payload;
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

export default userReducer.reducer;
