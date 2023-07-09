import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {Signup} from '../components/Auth/Signup'
// import { Login } from "../components/Auth/Login";

import { uiActions } from "../store/ui-slice";
import { setCredentials } from "../store/Auth-slice";
import { useLoginMutation } from "../store/authApiSlice";
import { useSignupMutation } from "../store/authApiSlice";

const LoginPage = () => {
  const [searchParams] = useSearchParams();

  let navigate = useNavigate();

  const isLogin = searchParams.get("query") === "login";

  const navTo = () => {
    navigate(`/user/?query=${isLogin ? "signup" : "login"}`, {
      replace: true,
    });
  };

  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const [signup] = useSignupMutation();

  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleData = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };

  const { username, email, password, password2, bio } = formState;

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        
        const userData = await login({username: email, password}).unwrap();

        const { username : currentUsername, bio, userId, accessToken, userRole } = userData;
        
        dispatch(setCredentials({ token : {accessToken }, user:{ email, currentUsername, bio, userId, userRole }}));
        navigate("/", { replace: true });
      } else {
        if (password !== password2) {
          dispatch(
            uiActions.showAlert({
              status: "error",
              title: "Error!",
              message: "Passwords do not match",
            })
          );
          return;
        }

      const userData = await signup({username, email, password}).unwrap();

      const { username : currentUsername, bio, userId, accessToken, refreshToken } = userData;
      dispatch(setCredentials({ token : {accessToken, refreshToken}, user:{ email, currentUsername, bio, userId }}));
      navigate("/", { replace: true });
      }
    }catch(err){
      console.error(err);
        dispatch(
            uiActions.showAlert({
              status: "error",
              title: "Error!",
              message: err.data.message,
            })
        );
    }
    
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-green-300 ">
      <div className="w-1/3 ">
        {/* <Alert
          status={alert?.status}
          title={alert?.title}
          message={alert?.message}
        /> */}
      </div>
      <div className="w-1/3 p-8 bg-white">
        <h2 className="mb-4 text-center">
          {isLogin ? "Login form" : "Signup form"}
        </h2>
        <form onSubmit={onSubmitHandler}>
          <Signup onHandleData={handleData} isLogin={isLogin} />
          {/* <Login onHandleData={handleData} /> */}
          <button
            type="submit"
            className="bg-black px-8 py-2 text-white ml-auto mr-auto mt-4 block"
          >
            {isLogin ? "login" : "signup"}
          </button>
          <button
            className="ml-auto mr-auto mt-4 block mb-2"
            type="button"
            onClick={() => {
              navTo();
            }}
          >
            {isLogin ? "Not registered ? signup" : "I already have an account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
