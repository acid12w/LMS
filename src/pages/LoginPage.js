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

import backgroundImage1 from '../assets/oluwakemi-solaja-ZN52ZBFkw4Y-unsplash.jpg'

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

  console.log(isLogin)
  const linkContent = isLogin? <p>Not registered ? <span className="text-green-600 cursor-pointer">signup</span></p>: <p>I already have an account <span className="text-emerald-500 cursor-pointer">login</span></p>;

  

  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const [signup] = useSignupMutation();

  const [formState, setFormState] = useState({
    usernameinput: "",
    userEmail: "",
    password: "",
    password2: "",
  });

  const handleData = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };

  const { usernameinput, userEmail, password, password2 } = formState;

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) { 
        const userData = await login({username: userEmail, password}).unwrap();
        const { accessToken, bio, username, email, myCourses, userId, profileImage } = userData;
        dispatch(setCredentials({ token : {accessToken: accessToken }, user:{ email: email, currentUsername: username, bio: bio, userId: userId, myCourses: myCourses, profileImage: profileImage }}))
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
        console.log('singup')
      const userData = await signup({username:usernameinput, email: userEmail, password}).unwrap();  
      const { accessToken, bio, username, email, myCourses, userId, profileImage} = userData; 

      dispatch(setCredentials({ token : {accessToken }, user : { bio, currentUsername: username, email, myCourses, userId, profileImage}}));
      navigate("/profile", { replace: true });
      }
    }catch(err){
      console.error(err);
        dispatch(
            uiActions.showAlert({
              status: "error",
              title: "Error!",
              message: err.data,
            })
        );
    }
    
  };

  return (
   <div className="flex">
        
        <div className="w-1/2 h-full p-44 flex flex-col justify-center">
          {/* {!isLogin || <h4 className="text-xs p-4 bg-gray-100">Use these credentials to log in as an instructor: johnDoe@test.com, password12</h4>} */}
          <h2 className="mb-4 text-center text-2xl">
            {isLogin ? "Login" : "Signup"}
          </h2>
          <form onSubmit={onSubmitHandler}>
            <Signup onHandleData={handleData} isLogin={isLogin} />
            {/* <Login onHandleData={handleData} /> */}
            <button
              type="submit"
              className="w-full bg-green-600 px-8 py-4 text-white hover:bg-green-700"
            >
              {isLogin ? "Login" : "Signup"}
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

        <div  style={{
          backgroundImage: `url(${backgroundImage1})`,
        }}
        className="w-1/2 bg-center bg-cover bg-no-repeat m-8 rounded-lg">
      </div>
    </div>
  );
};

export default LoginPage;
