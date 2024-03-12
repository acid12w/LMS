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
const [profileImage, setProfileImage] = useState(null)
const [formIsNotValid, setFormIsNotValid] = useState(false)

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
            console.log('fired')
            return;
        };
      
        setFormIsNotValid(false);

        updateUserProfile({payload: updateObj, email: email});
        dispatch(setUpdateProfileImage(profileImage));

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


// if(!userProfile) {
//     return  <p>...</p>
// }

return(
    <div className="flex">
    <div className="w-80 border-r-2 border-gray-100">
      <SideNav />
    </div>
    <div className="main p-8 bg-gray-50 h-full">
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
            // onBlur={}
            // placeholder={userProfile.currentUsername}
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
            // onBlur={}
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
            // onBlur={}
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