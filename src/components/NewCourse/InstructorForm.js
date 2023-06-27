import { useState } from "react";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../firebase/firebase";
import { v4 } from "uuid";

import { IoIosClose } from "react-icons/io";

import TextEditor from "../UI/TextEditor";

export const InstructorForm = ({
  onNextStep,
  onPrevStep,
  hasError,
  formData,
  onBlurHandler,
  onHandleChange,
  handlefileData,
  onHandleChangeData,
}) => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isloading, setIsloading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const uploadFile = (e) => {
    e.preventDefault();
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      setIsloading(true);
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url);
        handlefileData(url);
        setIsloading(false);
        setIsUploaded(true);
      });
    });
  };

  const dellteFile = (e) => {
    e.preventDefault();
    // Delete the file
    const imageRef = ref(storage, imageUrl);
    deleteObject(imageRef)
      .then(() => {
        setImageUrl(null);
        setIsUploaded(false);
        // File deleted successfully
        console.log(" File deleted successfully");
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  };

  const { instructorName } = formData;
  const { instructorNameHasError } = hasError;
  const { instructorNameBlurHandler } = onBlurHandler;
  const { instructorNameChangeHandler } = onHandleChange;

  return (
    <>
      <div className="mb-12">
        {/* <label className="p-1">Course Name</label> */}
        <input
          type="text"
          id="Name"
          required
          value={instructorName}
          onBlur={instructorNameBlurHandler}
          onChange={instructorNameChangeHandler}
          placeholder="Instructor Name"
          className={`${"bg-gray-100 h-full w-full border-none outline-none p-4"} ${
            instructorNameHasError ? "bg-red-100" : ""
          }`}
        />
        {instructorNameHasError && (
          <p className=" text-red-400 mt-2 ml-1">
            Course name must not be empty
          </p>
        )}
      </div>

      <div className="mb-12 flex j justify-evenly items-center">
        {/* <label className="p-1">Course Name</label> */}
        <div>
          <h4>Instructor profile image</h4>
          <h5 className="text-sm text-gray-500">upload a good profile image</h5>
        </div>
        {isloading && (
            <p>...</p>
        )}

        {isUploaded ? (
          <div className=" w-96 h-96">
            <IoIosClose
              className="text-gray-500 text-2xl absolute p-1 bg-gray-100"
              onClick={(e) => dellteFile(e)}
            />
            <img src={imageUrl} alt="thumbnail" className="w-full" />
          </div>
        ) : (
          <div className="p-6 flex flex-col items-center">
            <input
              type="file"
              required
              accept="image/jpg, image/png, image/jpeg"
              onChange={(e) => setImageUpload(e.target.files[0])}
              className="cursor-pointer bg-gray-200 px-4 py-2 mr-4 text-gray-800 font-semibold my-2 rounded flex"
            />
            <button
              onClick={(e) => uploadFile(e)}
              className="bg-green-500 px-4 py-2 mr-4 text-green-800 font-semibold my-2 rounded flex"
            >
              Upload
            </button>
            <h5 className="text-center">
              <strong className="text-green-400">
                {" "}
                Browse files to upload{" "}
              </strong>{" "}
              PNG, JPG, (max, 800x400px)
            </h5>
          </div>
        )}
      </div>

      <div className="mb-12">
        <label className="p-1">Instructor bio</label>
        <TextEditor handleChange={onHandleChangeData("bio")} />
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => onPrevStep()}
          className="bg-green-500 px-4 py-2 text-green-800 font-semibold my-2 rounded mr-4"
        >
          prev
        </button>
        <button
          onClick={() => onNextStep()}
          className="bg-green-500 px-4 py-2 text-green-800 font-semibold my-2 rounded"
        >
          next
        </button>
      </div>
    </>
  );
};
