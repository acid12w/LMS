import React, { useState } from "react";   
// import useAuth from "../hooks/useAuth";
import { useSearchParams, useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";

// import {Signup} from '../components/Auth/Signup'

import { uiActions } from "../store/ui-slice";
import { setCredentials } from "../store/Auth-slice";
import { useLoginMutation } from "../store/authApiSlice";
import { useSignupMutation } from "../store/authApiSlice";

import usePersist from "../hooks/usePersist";
import useInput from "../hooks/use-input";

import backgroundImage1 from '../assets/oluwakemi-solaja-ZN52ZBFkw4Y-unsplash.jpg'
import { PassPopover } from "../components/UI/popover/passPopover";

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

  const regExp = /^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,32}$/;

  const {
    value: password,
    // isValid: passwordisValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    // rest: restPassword,
  } = useInput((value) => regExp.test(value));

  const {
    value: loginpassword,
    // isValid: passwordisValid,
    hasError: loginpasswordHasError,
    valueChangeHandler: loginpasswordChangeHandler,
    inputBlurHandler: loginpasswordBlurHandler,
    // rest: restPassword,
  } = useInput((value) => value.trim());

  const {
    value: emailValue,
    // isValid: emailisValid,
    // hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    // inputBlurHandler: emailBlurHandler,
    // rest: restemail,
  } = useInput((value) => value.trim());

  const linkContent = isLogin? <p>Not registered ? <span className="text-green-600 cursor-pointer">Create account</span></p>: <p>I already have an account <span className="text-green-600 cursor-pointer">Login</span></p>;


  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const [signup] = useSignupMutation();

  const [togglePopup, setTogglePopup] = useState(false);

  const [formState, setFormState] = useState({
    usernameinput: "",
    userEmail: "",
    password: "",
    password2: "",
  });

  const handleValidiadtion = (e) => {
    const regExp = /^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,32}$/;
   if (regExp.test(password)){
      console.log("password is Valid");
      return;
    }else if(!regExp.test(password)){
      
      }
    
  }

  const handleData = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };

  const { usernameinput, password2 } = formState;

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {  
      if (isLogin) { 
        console.log(emailValue)
        const userData = await login({username: emailValue, password: loginpassword}).unwrap();
        const { accessToken, bio, username, email, myCourses, userId, profileImage } = userData;
        dispatch(setCredentials({ token : {accessToken: accessToken }, user:{ email: email, currentUsername: username, bio: bio, userId: userId, myCourses: myCourses, profileImage: profileImage }}))
        setPersist(prev => !prev)
        navigate("/home", { replace: true });
      } else {
        handleValidiadtion(password);
        console.log('password')
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
      const userData = await signup({username:usernameinput, email: emailValue, password}).unwrap();  
      const { accessToken, bio, username, email, myCourses, userId, profileImage} = userData; 

      dispatch(setCredentials({ token : {accessToken }, user : { bio, currentUsername: username, email, myCourses, userId, profileImage}}));
      navigate("/profile", { replace: true });
      }
    }catch(err){
      console.error(err);
      console.log(err)
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
   <div className="flex flex-col sm:flex-row">
        
        <div className="w-full md:w-1/2 h-full p-8 md:p-44 flex flex-col justify-center">
          <h2 className="mb-4 text-center text-2xl">
            {isLogin ? "Login" : "Signup"}
          </h2>
          <form onSubmit={onSubmitHandler}>
            
          {isLogin && (
            <div>
              <label className="h-12 mb-10 flex flex-col">
                <input
                  type="email"
                  id="userEmail"
                  required  
                  // value={}
                  // onBlur={}
                  onChange={emailChangeHandler}
                  placeholder="email"
                  className="h-14 w-full rounded-md border-gray-200 border-2 p-4 accent-emerald-950 focus:bg-green-50 focus:outline-green-600"
                />
              </label>

              <label className="h-12 mb-10 flex flex-col">
                <input
                  type="password"
                  id="password"
                  required
                  onBlur={loginpasswordBlurHandler}
                  onChange={loginpasswordChangeHandler}
                  placeholder="password"
                  className="h-14 w-full rounded-md border-gray-200 border-2 p-4 focus:bg-green-50 focus:outline-green-600"
                />
                {loginpasswordHasError && (
                      <p className="text-sm text-red-400 mt-1">
                        Please enter a valid password
                      </p>
                )}
              </label>
            </div>
        
      )}
      {!isLogin && (
        <div>
          <label className="h-12 mb-10 flex flex-col">
            <input
              type="text"
              id="usernameinput"
              required
              // value={}
              // onBlur={}
              onChange={handleData}
              placeholder="username"
              className="h-14 w-full rounded-md border-gray-200 border-2 p-4 focus:bg-green-50 focus:outline-green-600"
          />
        </label>
        <label className="h-12 mb-10 flex flex-col">
          <input
            type="userEmail"
            id="userEmail"
            required
            // value={}
            // onBlur={}
            onChange={emailChangeHandler}
            placeholder="email"
            className="h-14 w-full rounded-md border-gray-200 border-2 p-4 focus:bg-green-50 focus:outline-green-600"
          />
        </label>

        <PassPopover togglePopup={togglePopup}/>
        
        <label className="h-12 mb-10 flex flex-col" onMouseEnter={() => setTogglePopup(true)} onMouseLeave={() => setTogglePopup(false)}>
          <input
            type="password"
            id="password"
            required
            // value={}
            onBlur={passwordBlurHandler}
            onChange={passwordChangeHandler}
            placeholder="password"
            className="h-14 w-full rounded-md border-gray-200 border-2 p-4 focus:bg-green-50 focus:outline-green-600"
          />
          {passwordHasError && (
            <p className="text-sm text-red-400 mt-1">
              Please enter a valid password
            </p>
          )}
        </label>
        <label className="h-12 mb-10 flex flex-col">
          <input
            type="password"
            id="password2"
            required
            // value={}
            // onBlur={}
            onChange={handleData}
            placeholder="confirm password"
            className="h-14 w-full rounded-md border-gray-200 border-2 p-4 focus:bg-green-50 focus:outline-green-600"
          />
        </label>
      </div>
      )}

            
      <button
        type="submit"
        className="w-full bg-green-600 px-8 py-4 text-white hover:bg-green-700">
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

        <div style={{
          backgroundImage: `url(${backgroundImage1})`,
        }}
        className="w-1/2 bg-center bg-cover bg-no-repeat m-8 rounded-lg">
      </div>
    </div>

    
  );
};

export default LoginPage;
 