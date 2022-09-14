import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification: (_, action) => {
      return action.payload
    },
    clearNotification: () => {
      return null
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

var notificationTimeout = null

export const createNotification = (content, time) => {
  return async dispatch => {
    dispatch(setNotification(content))

    if (notificationTimeout) {
      clearTimeout(notificationTimeout)
    }
    notificationTimeout = setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
  }
}

export default notificationSlice.reducer
