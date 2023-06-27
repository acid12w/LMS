import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const {user, token } = action.payload;
      state.token = token.accessToken;  
      state.refreshToken = token.refreshToken;  
      state.user = user;
    },

    logout: (state) => {
      state.token = null;
      state.isLoggedin = false;
      state.user = null;
    },

  },
});

export const {setCredentials, logout} = AuthSlice.actions;

export default AuthSlice;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
