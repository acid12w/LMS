import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom"; 
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

import { useUpdateCourseMutation } from "../../store/courseApiSlice";

const parse = require("html-react-parser");


export const CousreFrom = ({ myCourses }) => {

const dispatch = useDispatch();
const params = useParams();

const [updateCourse, {isLoading: isUpdating}] = useUpdateCourseMutation()

  const courseId = params.id;

  const currentCourse = myCourses?.find((course) => course._id === courseId);

  const [toggleEdit, setToggleEdit] = useState(false);

  const courseNameInput = useRef();
  const overviewInput = useRef();
  const subjectInput = useRef();
  const difficultyInput = useRef();

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
              message: "Lesson is beeing added",
          })
      );
    }

    try{
        const data = {};

        if(courseNameInput.current.value.trim() !== '') data.courseName = courseNameInput.current.value;
        if(overviewInput.current.value.trim() !== '') data.overview = overviewInput.current.value;
        if(subjectInput.current.value.trim() !== '') data.subject = subjectInput.current.value;
        if(difficultyInput.current.value !== currentCourse.difficulty && difficultyInput.current.value.trim() !== '') data.difficulty = difficultyInput.current.value;

        if(Object.keys(data).length === 0) return;
      
        await updateCourse({data, id: courseId});

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
    
    courseNameInput.current.value = '';
    overviewInput.current.value = '';
    subjectInput.current.value = '';
    difficultyInput.current.value = '';

  } 

  return (
    
      <form onSubmit={handleSubmitCourse} className=" mb-8 ml-1/3">
        <div className="w-2/3 block m-auto">
          {toggleEdit ?
                <label className="text-sm mr-4 h-12 mt-2">
                Course name
                <input
                type="text"
                id="firstName"
                ref={courseNameInput}
                placeholder={currentCourse.courseName}
                className="bg-gray-100 h-full w-full border-none outline-none p-4 mb-1 mt-2"
                />
                </label> : <div className="mb-6 "><h2 className="text-center mb-4">{currentCourse.courseName}</h2></div>}
          
          <div className="w-96 block m-auto mb-2">
            <img
              className="h-full w-full "
              src={currentCourse.thumbNail}
              alt="thumb nail"
            />
          </div>
          {toggleEdit ?
                <label className="text-sm mr-4 h-12 mt-2">
                Subject
                <input
                type="text"
                id="firstName"
                ref={subjectInput}
                placeholder={currentCourse.subject}
                className="bg-gray-100 h-full w-full border-none outline-none p-4 mb-1 mt-2"
                />
                </label> : <div className="mb-6 "><h3 className="mb-2">subject: {currentCourse.subject}</h3></div>}
    
          {toggleEdit ?
                <label className="text-sm mr-4 h-12 mt-2">
                Overview
                <textarea
                type="text"
                id="firstName"
                ref={overviewInput}
                placeholder='add course overview here'
                className="bg-gray-100 h-full w-full border-none outline-none p-4 mb-1 mt-2" 
                />
                </label> : <div className="mb-6 "><h2 className="mb-2">{parse(currentCourse.overview)}</h2></div>}
          
          {toggleEdit ?
            <label className="text-sm mr-4 h-12 my-2">
                  Difficulty:
                <select
                  ref={difficultyInput}
                  name="difficulty"
                  id="difficulty"
                >
                
                <option value="beginner" >Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </label> : <div className="mb-6 "><h3 className="mb-2">difficulty: {currentCourse.difficulty}</h3></div>}
                <div className="flex">
                <button onClick={() => setToggleEdit(!toggleEdit)} className="bg-black px-8 py-2 text-white mt-4 block mr-4" type="button">
                Edit
            </button>
            {toggleEdit ? <button  className="bg-black px-8 py-2 text-white  mt-4 block" type="submit">
                Save
            </button> : ''}
            </div>
        </div>
      </form>
  );
};
