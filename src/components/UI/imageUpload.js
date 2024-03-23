import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { uiActions } from "../../store/ui-slice";

import { useAddThumbNailMutation } from "../../store/uploadApiSlice";

import { IoIosClose } from "react-icons/io";

import { MutatingDots } from 'react-loader-spinner';

export const ImageUpload = ({text, subtext, setImageUrl, thumbNail }) => {

  const dispatch = useDispatch();
 
  const [addThumbNail, isLoading] = useAddThumbNailMutation();
  
  const [imageUpload, setImageUpload] = useState(null);
  const [image, setImage] = useState(thumbNail);
  const imageTrue = thumbNail === undefined; 
  const [isUploaded, setIsUploaded ] = useState(!imageTrue);
  const [message, setMessage] = useState()

  useEffect(() => {setImage(thumbNail)}, [thumbNail])

  
  const uploadFile =  async (e) => {
    e.preventDefault();

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
        setImage(url?.data?.display_url)
        setImageUrl(url?.data?.display_url)
        setIsUploaded(true);
    }catch(error){
      console.error(error)
    }
  } 
  
  const hideImage = () => {
    setIsUploaded(false)
  }

  return (
    <form onSubmit={uploadFile}>
      {/* <label className="p-1">Course Name</label> */}
      <div className="mb-4">
        <h4>{text}</h4>
        <h5 className="text-sm text-gray-500">
          {subtext}
        </h5>
      </div>
      {isLoading.isLoading && (
          <MutatingDots
          visible={true}
          height="100"
          width="100"
          color="#4fa94d"
          secondaryColor="#4fa94d"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
          />
      )}

      {isUploaded ? (
        <div className=" w-96 h-72">
          <IoIosClose
            className="text-gray-500 text-2xl absolute p-1 bg-gray-100 fill-black cursor-pointer hover:bg-red-600 hover:fill-white"
            onClick={hideImage}
          />
          <img src={image} key={image} alt="thumbnail" className="w-full" />
        </div>
      ) : (
        <div>
          <input
            required
            type="file"
            accept="image/jpg, image/png, image/jpeg"
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
            }}
            className="cursor-pointer bg-gray-200 px-4 py-2 mr-4 text-gray-800 font-semibold my-2 rounded flex"
          />
          <button
            type="submit"
            className="bg-green-500 px-4 py-2 mr-4 text-green-800 font-semibold my-2 rounded flex"
            onClick={uploadFile}
          >
            Upload
          </button>
          <h5>
            <strong className="text-green-400"> Browse files to upload </strong>{" "}
            PNG, JPG, (max, 800x400px)
          </h5>
        </div>
      )}
    </form>
  );
};
