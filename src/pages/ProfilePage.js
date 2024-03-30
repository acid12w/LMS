import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../store/ui-slice";

import { setUpdateProfileImage } from '../store/Auth-slice'

import { useUpdateUserProfileMutation } from "../store/authApiSlice";

import { SideNav } from "../components/UI/SideNav";
import { ImageUpload } from "../components/UI/imageUpload";

const ProfilePage = () => {

const dispatch = useDispatch();
const [updateUserProfile] = useUpdateUserProfileMutation();

let userNameInput = useRef();
let emailInput = useRef();
let bioInput = useRef();
const [profileImage, setProfileImage] = useState(null);
const [formIsNotValid, setFormIsNotValid] = useState(false);
const [toggleSideNav, setToggleSideNav] = useState(false);

const userProfile = useSelector((state) => state.auth.user);
const email = userProfile.email;


const onHandleSubmit = (e) => {
    e.preventDefault();
    if(userNameInput.current.value.trim() === undefined && emailInput.current.value.trim() === undefined && bioInput.current.value.trim() === undefined) return;

    try{
        const updateObj = {};
        if(userNameInput.current.value !== userProfile.currentUsername ) updateObj.username = userNameInput.current.value;
        if(emailInput.current.value !== userProfile.email)  updateObj.email =  emailInput.current.value; 
        if(bioInput.current.value !== userProfile.bio) updateObj.bio = bioInput.current.value
        if(profileImage != null) updateObj.profileImage = profileImage;

        if(Object.keys(updateObj).length === 0) {
            setFormIsNotValid(true);
            return;
        };
      
        setFormIsNotValid(false);

        updateUserProfile({payload: updateObj, email: email});

        if(profileImage != null ){
            dispatch(setUpdateProfileImage(profileImage));
        }
        
        dispatch(
            uiActions.showAlert({
              status: "success",
              title: "Success!",
              message: "Your profile has been updated",
            })
        );

    }catch(err){
        console.log(err)
        dispatch(
            uiActions.showAlert({
              status: "error",
              title: "Error!",
              message: err.data.message,
            })
        );
    }
}


return(
    <div className="flex">
     <button onClick={() => setToggleSideNav(!toggleSideNav)} type="button" class="absolute  inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>
    <div className={`w-80 border-r-2 border-gray-100 fixed z-30 bg-white h-full ${toggleSideNav ? 'translate-x-[0]' : 'translate-x-[-100%]'}`}>
    <SideNav setToggleSideNav={setToggleSideNav} toggleSideNav={toggleSideNav}/>
    </div>
    <div className="w-full md:main p-8 bg-gray-50 h-full">
        <ImageUpload text={"Profile picture"} subtext={"upload an personalized profile picture"} setImageUrl={setProfileImage} thumbNail={userProfile.profileImage}/> 
    <form onSubmit={onHandleSubmit} className="pb-44 w-2/3"> 
        <label className="text-sm mr-4 h-12 mb-10 flex flex-col">
            Username
            <input
            type="text"
            id="firstName"
            required
            ref={userNameInput}
            defaultValue={userProfile.currentUsername}
            className="bg-gray-100 text-gray-500 h-full border-none outline-none p-4 mb-1 mt-2"
            />
        </label> 

        <label className="text-sm mr-4 h-12 mb-10 flex flex-col">
            Email address
            <input
            type="text"
            id="firstName"
            ref={emailInput}
            defaultValue={userProfile.email}
            className="bg-gray-100 text-gray-500 h-full border-none outline-none p-4 mb-1 mt-2"
            />
        </label> 
        <label className="text-sm mr-4 mb-8 flex flex-col">
            Bio
            <textarea
            type="text"
            id="firstName"
            ref={bioInput}
            defaultValue={userProfile.bio}
            className="bg-gray-100 text-gray-500 h-36 border-none outline-none p-4 mb-1 mt-2"
            />
        </label> 
      
        <button  className="bg-black hover:bg-emerald-600 px-8 py-2 text-white  mt-4 block" type="submit">
            Save
        </button> 
        {formIsNotValid && (
            <p className=" text-red-400 mt-2 ml-1">
              No changes detected!
            </p>
          )}
    </form>
    </div>
  </div>
    
    )
} 

export default ProfilePage;