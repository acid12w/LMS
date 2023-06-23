import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comment: [],
  changed: false,
};

export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment(state, action) {
      state.comment = action.payload;
    },
    isChanged(state) {
      state.changed = !state.changed;
    },
  },
});

export const commentActions = commentSlice.actions;

export default commentSlice;
