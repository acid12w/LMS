import React, { useState } from "react";
// import useAuth from "../hooks/useAuth";
import { useSearchParams, useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";

import {Signup} from '../components/Auth/Signup'

import { uiActions } from "../store/ui-slice";
import { setCredentials } from "../store/Auth-slice";
import { useLoginMutation } from "../store/authApiSlice";
import { useSignupMutation } from "../store/authApiSlice";

import usePersist from "../hooks/usePersist";

const LoginPage = () => {

  const [persist, setPersist] = usePersist();
  const [searchParams] = useSearchParams();

  let navigate = useNavigate();

  const isLogin = searchParams.get("query") === "login";

  const navTo = () => {
    navigate(`/user/?query=${isLogin ? "signup" : "login"}`, {
      replace: true,
    });
  };

  const linkContent = isLogin? <p>Not registered ? <span className="text-emerald-500 cursor-pointer">signup</span></p>: <p>I already have an account <span className="text-emerald-500 cursor-pointer">login</span></p>;

  

  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const [signup] = useSignupMutation();

  const [formState, setFormState] = useState({
    username: "",
    userEmail: "",
    password: "",
    password2: "",
  });

  const handleData = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };

  const { username, userEmail, password, password2 } = formState;

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) { 
        
        const userData = await login({username: userEmail, password}).unwrap();
       console.log(userData)
        const { accessToken, bio, username, email, myCourses, userId } = userData;
        dispatch(setCredentials({ token : {accessToken: accessToken }, user:{ email: email, currentUsername: username, bio: bio, userId: userId, myCourses: myCourses }}))
        setPersist(prev => !prev)
        navigate("/home", { replace: true });
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
        console.log(userEmail)
      const userData = await signup({username, email: userEmail, password}).unwrap();  
      const { accessToken, bio, username, email, myCourses, userId } = userData;
      dispatch(setCredentials({ token : {accessToken }, user : { bio, currentUsername: username, email, myCourses, userId}}));
      navigate("/home", { replace: true });
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
      {!isLogin || <h4 className="text-xs p-4 bg-gray-100 w-1/3">Use these credentials to log in as an instructor: johnDoe@test.com, password12</h4>}
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
          <div
            className="ml-auto mr-auto mt-4 block mb-2 text-center"
            type="button"
            onClick={() => {
              navTo();
            }}
          >
          {linkContent}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
