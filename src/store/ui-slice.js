import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { Alert: null, showAlert: false },
  reducers: {
    showAlert(state, action) {
      state.Alert = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
      state.showAlert = true;
    },

    toggleShowAlert(state) {
      state.showAlert = false;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
