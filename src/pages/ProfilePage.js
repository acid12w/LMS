import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../store/ui-slice";

import { useUpdateUserProfileMutation } from "../store/authApiSlice";

import { SideNav } from "../components/UI/SideNav";
// import { Roller } from "react-awesome-spinners";

// import profile from "../assets/avatar.png";


const ProfilePage = () => {

const dispatch = useDispatch();
const [toggleEdit, setToggleEdit] = useState(false);
const [updateUserProfile] = useUpdateUserProfileMutation();

const userNameInput = useRef();
const emailInput = useRef();
const bioInput = useRef();

const userProfile = useSelector((state) => state.auth.user); 

const handleEdit = () => {
    setToggleEdit(!toggleEdit);
}

const onHandleSubmit = (e) => {
    e.preventDefault();

    if(userNameInput.current.value.trim() && emailInput.current.value && bioInput.current.value) return;

    try{
        const updateObj = {};
        if(userNameInput.current.value !== "" ) updateObj.username = userNameInput.current.value;
        if(emailInput.current.value !== "")  updateObj.email =  emailInput.current.value; 
        if(bioInput.current.value !== "") updateObj.bio = bioInput.current.value
        const currentUsername = userProfile.currentUsername

        if(Object.keys(updateObj).length === 0) return;

        updateUserProfile({updateObj, currentUsername});

        dispatch(
            uiActions.showAlert({
              status: "success",
              title: "Success!",
              message: "Course has been created",
            })
        );

    }catch(err){
        dispatch(
            uiActions.showAlert({
              status: "error",
              title: "Error!",
              message: err.data.message,
            })
        );
    }

    userNameInput.current.value = ""
    emailInput.current.value = ""
    bioInput.current.value = ""
}


if(!userProfile) {
    return (
        <div className="h-screen flex justify-center items-center">
          {/* <Roller color="lightgray" /> */}
          <p>...</p>
        </div>
      );
}

return(
    <div className="flex">
    <div className="w-80 border-r-2 border-gray-100">
      <SideNav />
    </div>
    <div className="main p-8 bg-gray-50 h-full">
    <form onSubmit={onHandleSubmit} className="p-10 flex flex-col items-center pb-48"> 
        <div>
            <div className="mb-8 flex flex-col justify-center items-center"> 
            <div className="h-16 w-16 bg-center bg-red-400 rounded-full mr-4 p-4">
                <h1 className="text-white text-base font-bold text-center ">
                {`${userProfile.currentUsername[0].toUpperCase()}  ${userProfile.currentUsername[1].toUpperCase()}`}
                </h1>
            </div>
                
                {toggleEdit ? <label className="text-sm mr-4 h-12 mb-4">
                    username
                    <input
                    type="text"
                    id="firstName"
                    ref={userNameInput}
                    // value={}
                    // onBlur={}
                    placeholder={userProfile.currentUsername}
                    className="bg-gray-100 h-full w-full border-none outline-none p-4 mb-1 focus:text-black focus:invalid: bg-blue-100 "
                    />
                    </label> : <h4>{userProfile.currentUsername}</h4>}
            </div>
            <div className="">
                <h3 className="mb-8">Personal Information</h3>
                {/* <div className="flex mb-6">
                    { toggleEdit ? 
                    <label className="text-sm mr-4 mb-6 h-12">
                        First Name
                        <input
                        type="text"
                        id="firstName"
                        required
                        ref={firstNameInput}
                        // value={}
                        // onBlur={}
                        placeholder={userProfile.username}
                        className="bg-gray-100 h-full w-full border-none outline-none p-4 mb-1 mt-2"
                        />
                        </label> : <div className="mb-2 mr-36"><h5 className="text-sm">First Name</h5> <h4 className="text-sm text-gray-600">Adrian</h4> </div>
                        }
                    
                    { toggleEdit ? <label className="text-sm mr-4 h-12">
                        Last Name
                        <input
                        type="text"
                        id="firstName"
                        required
                        ref={lastNameIput}
                        // value={}
                        // onBlur={}
                        placeholder={userProfile.username}
                        className="bg-gray-100 h-full w-full border-none outline-none p-4 mb-1 mt-2"
                        />
                        </label> :  <div className="mb-2 "><h5 className="text-sm">Seond Name</h5><h4 className="text-sm text-gray-600">Anderson</h4></div>}
                    </div> */}
                
                {toggleEdit ?
                <label className="text-sm mr-4 h-12 mt-2">
                email address
                <input
                type="text"
                id="firstName"
                ref={emailInput}
                // value={}
                // onBlur={}
                placeholder={userProfile.email}
                className="bg-gray-100 h-full w-full border-none outline-none p-4 mb-1 mt-2"
                />
                </label> : <div className="mb-6 "><h5 className="text-sm">Email address</h5><h4 className="text-sm text-gray-600">{userProfile.email}</h4></div>}
                {toggleEdit ?
                <label className="text-sm mr-4 h-12">
                bio
                <input
                type="text"
                id="firstName"
                ref={bioInput}
                // value={}
                // onBlur={}
                placeholder={userProfile.bio}
                className="bg-gray-100 h-full w-full border-none outline-none p-4 mb-1 mt-2"
                />
            </label> : <div className="mb-10 "><h5 className="text-sm">Bio</h5><h4 className="text-sm text-gray-600">{userProfile.bio}</h4></div>}
            </div>
            <div className="flex">
                <button onClick={handleEdit} className="bg-black px-8 py-2 text-white mt-4 block mr-4" type="button">
                Edit
            </button>
            {toggleEdit ? <button className="bg-black px-8 py-2 text-white  mt-4 block" type="submit">
                Save
            </button> : ''}
            </div>
        </div>
    </form>
    </div>
  </div>
    
    )
} 

export default ProfilePage;