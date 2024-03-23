import {io, socket} from 'socket.io-client';
import { createSlice } from "@reduxjs/toolkit";

const socket = io('http://localhost:3001');

 export const Messageslice = () => createSlice({
    name: 'chat',
    message: socket,
    reducers: {
        setMessage: (state, action) => {
          state.user = action.payload;
        }
    }
})

export const {setMessage} = AuthSlice.actions;

export default AuthSlice;

export const selectCurrentUser = (state) => state.chat.message;
