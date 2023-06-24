import React, { useState } from "react";
import { useAddThumbNailMutation } from "../../store/uploadApiSlice";

import { IoIosClose } from "react-icons/io";
// import { Roller } from "react-awesome-spinners";

export const ImageUpload = ({setImageUrl }) => {

 
  const [addThumbNail, isLoading] = useAddThumbNailMutation();
  
  const [imageUpload, setImageUpload] = useState(null);
  const [image, setImage] = useState(null);
  const [isUploaded, setIsUploaded ] = useState(false);
  
  const uploadFile =  async (e) => {
    e.preventDefault();

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
  

  return (
    <form onSubmit={uploadFile} className=" flex justify-around items-center">
      {/* <label className="p-1">Course Name</label> */}
      <div>
        <h4>Course Thunbnail</h4>
        <h5 className="text-sm text-gray-500">
          upload an eye catching thumbnail
        </h5>
      </div>
      {isLoading.isLoading && (
        <div className="absolute right-1/3">
          {/* <Roller color="lightgray" /> */}
          <p>...</p>
        </div>
      )}

      {isUploaded ? (
        <div className=" w-96 h-96">
          <IoIosClose
            className="text-gray-500 text-2xl absolute p-1 bg-gray-100"
            // onClick={(e) => dellteFile(e)}
          />
          <img src={image} alt="thumbnail" className="w-full" />
        </div>
      ) : (
        <div className="p-6 flex flex-col items-center">
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
          <h5 className="text-center">
            <strong className="text-green-400"> Browse files to upload </strong>{" "}
            PNG, JPG, (max, 800x400px)
          </h5>
        </div>
      )}
    </form>
  );
};
