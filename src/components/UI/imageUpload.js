import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { uiActions } from "../../store/ui-slice";

import { useAddThumbNailMutation } from "../../store/uploadApiSlice";

import { IoIosClose } from "react-icons/io";

import { MutatingDots } from 'react-loader-spinner';

export const ImageUpload = ({text, subtext, setImageUrl, thumbNail, updateProfileHandler, userEmail }) => {

  const dispatch = useDispatch();
 
  const [addThumbNail, isLoading] = useAddThumbNailMutation();
  
  const [imageUpload, setImageUpload] = useState(null);
  const [imageName, setImageName] = useState(null);

  const [image, setImage] = useState(thumbNail);
  const imageTrue = thumbNail === undefined; 
  const [isUploaded, setIsUploaded ] = useState(!imageTrue);

  

  const setImageDetails = (e) => {
    setImageUpload(e.target.files[0]);
    setImageName(e.target.files[0].name);
  }


  const uploadFile =  async (e) => {
    e.preventDefault();

     let imageProfile = new Object();

    if(imageUpload === null){
      dispatch(
        uiActions.showAlert({
            status: "error",
            title: "Error!",
            message: "No image uplaoded",
        })
      );
      return
    }

    try{
        const formData = new FormData();
        formData.append('file', imageUpload);
        const url = await addThumbNail(formData).unwrap();       
        imageProfile.profileImage = url?.data?.display_url;

        setImage(url?.data?.display_url);
        setImageUrl(url?.data?.display_url);
        setIsUploaded(true);
    }catch(error){
      console.error(error)
    }
  } 
  
  const hideImage = () => {
    setImageUrl(null);
    setIsUploaded(false);
  }

  return (
    
    <form onSubmit={uploadFile} className="mb-4 rounded-md">
      {/* <label className="p-1">Course Name</label> */}
      {/* <div className="mb-4">
        <h4>{text}</h4>
        <h5 className="text-sm text-gray-500 ">
          {subtext}
        </h5>
      </div> */}
      

      {isUploaded ? (
        <div className="w-full md:w-96 mb-2">
          <IoIosClose
            className="text-gray-500 text-2xl absolute p-1 fill-black cursor-pointer hover:bg-red-600 hover:fill-white"
            onClick={hideImage}
          />
          <img src={image} key={image} alt="thumbnail" className="w-full" />
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-center w-full">
              <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                      <p className="font-bold text-gray-500 dark:text-gray-400 mt-4 text-base">{imageName}</p>

                  </div>
                    <input
                      required
                      type="file"
                      accept="image/jpg, image/png, image/jpeg"
                      onChange={(e) => {
                        setImageDetails(e)
                      }}
                      id="dropzone-file"
                      className="hidden"
                    />
                    {imageName && (<button 
                    onClick={uploadFile} 
                    type="submit" 
                    className="bg-green-500 px-4 py-2 mr-4 text-green-800 font-semibold rounded " > 
                    Upload</button>)}
              </label>
          </div> 
        </div>
      )}
    </form>
  );
};
