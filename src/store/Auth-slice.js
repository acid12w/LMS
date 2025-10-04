import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
  courses: null,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const {user, token } = action.payload;
      state.token = token.accessToken;  
      state.user = user;
    },

    setUpdateProfileImage: (state, action) => {
      console.log(action.payload)
      state.user.profileImage = action.payload
    },

    setCourses: (state, action) => {
      state.myCourses = action.payload
    },

    logout: (state) => {
      state.token = null;
      state.isLoggedin = false;
      state.user = null;
    },
  },
});

export const {setCredentials,setUpdateProfileImage,setCourses,logout} = AuthSlice.actions;

export default AuthSlice;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentCourses = (state) => state.auth.courses;
