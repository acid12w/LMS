import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom"; 
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

import { useUpdateCourseMutation } from "../../store/courseApiSlice";
import { ImageUpload } from "../UI/imageUpload";
// import useInput from "../../hooks/use-input";


export const CousreFrom = ({ myCourses }) => {

const dispatch = useDispatch();
const params = useParams();

const [updateCourse, {isLoading: isUpdating}] = useUpdateCourseMutation()

  const courseId = params.id;

  const currentCourse = myCourses?.find((course) => course._id === courseId);
  const [isChecked, setIsChecked] = useState(currentCourse.imageFull);
  const [image, setImage] = useState();

  const courseNameInput = useRef();
  const overviewInput = useRef();
  const subjectInput = useRef();
  const difficultyInput = useRef();

  const changeHandler = (e) => {
    setIsChecked(!isChecked)
  }

  const handleSubmitCourse = async (e) => {
    e.preventDefault()
   
    if(courseNameInput.current.value.trim() && subjectInput.current.value.trim() && overviewInput.current.value.trim() && difficultyInput.current.value.trim() === ""){
        return
    }

    if(isUpdating){
      dispatch(
          uiActions.showAlert({
              status: "pending",
              title: "Sending!",
              message: "Course is beeing added",
          })
      );
    }

    try{
        const data = {};

        if(courseNameInput.current.value.trim() !== '') data.courseName = courseNameInput.current.value;
        if(image != null) data.thumbNail = image;
        if(overviewInput.current.value.trim() !== '') data.overview = overviewInput.current.value;
        if(subjectInput.current.value.trim() !== '') data.subject = subjectInput.current.value;
        if(difficultyInput.current.value !== currentCourse.difficulty && difficultyInput.current.value.trim() !== '') data.difficulty = difficultyInput.current.value;
        if(isChecked !== currentCourse.imageFull) data.imageFull = isChecked;

        if(Object.keys(data).length === 0) return;
      
        await updateCourse({data, id: courseId});

        dispatch(
          uiActions.showAlert({
            status: "success",
            title: "Success!",
            message: "Course has been successfully updated",
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
  } 

  return (
  <>

      <ImageUpload setImageUrl={setImage} thumbNail={currentCourse.thumbNail}/>
    
        <form onSubmit={handleSubmitCourse} className=" mb-8 ml-1/3 md:w-2/3 ">
        
          <label className="text-sm mr-4 h-12 mt-2">
            Course name
            <input
            type="text"
            id="firstName"
            ref={courseNameInput}
            key={currentCourse.courseName}
            defaultValue={currentCourse.courseName}
            className="bg-gray-100 text-gray-500 h-full w-full border-none outline-none p-4 mb-1 mt-2"
            />
          </label>
    
          <label className="text-sm mr-4 h-12 mt-2">
            Subject
            <input
            type="text"
            id="firstName"
            ref={subjectInput}
            key={currentCourse.courseName}
            defaultValue={currentCourse.subject}
            className="bg-gray-100 text-gray-500 h-full w-full border-none outline-none p-4 mb-1 mt-2"
            />
          </label> 

          <label className="text-sm mr-4 h-12 mb-10"> 
              Difficulty
              <select
              // onChange={difficultyChangeHandler}
              name="difficulty"
              id="difficulty"
              ref={difficultyInput}
              key={currentCourse.difficulty}
              defaultValue={currentCourse.difficulty}
              className="bg-gray-100 text-gray-500 h-full w-full border-none outline-none p-4 focus:text-black"
              >
              <option value="beginner" >Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              </select>
            </label>

          <label className="text-sm mr-4 h-12 mt-2">
            Overview
            <textarea
            type="text"
            id="firstName"
            ref={overviewInput}
            key={currentCourse.overview}
            defaultValue={currentCourse.overview}
            className="bg-gray-100 text-gray-500 h-36 w-full border-none outline-none p-4 mb-1 mt-2" 
            />
          </label> 

          <label>
            Background image full
            <input 
            className="ml-1" 
            type="checkbox" 
            checked={isChecked} 
            id="imageFull" 
            onChange={changeHandler}/> 
          </label>   
          <button type="submit" class="mt-4 block focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Save</button>   
        </form>
        </>
  );
};
