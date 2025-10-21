import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; 

import { useRemoveCourseMutation } from "../../store/courseApiSlice";

import { uiActions } from "../../store/ui-slice";

import { MdDeleteOutline } from "react-icons/md";

export const PublishedFrom = ({ currentCourse, updateCourse, lessons, courseId, lessonPublished }) => {
     
  const dispatch = useDispatch();

  const { isPublished } = currentCourse;

  let isDisabled = lessonPublished === false;

  console.log(isDisabled);


  const [ removeCourse, isSuccess, isError ] = useRemoveCourseMutation()

  let navigate = useNavigate();

  const handleRemoveCourse = async () => {

    try{

      removeCourse(courseId);

    if(isSuccess){
      dispatch(
          uiActions.showAlert({
            status: "success",
            title: "Success!",
            message: "Your course published status has been updated",
          })
        );
      }
    }catch(err){
          dispatch(
            uiActions.showAlert({
              status: "error",
              title: "Error!",
              message: err.data.message,
            })
        );
      }

    navigate(`/my-courses`, {
      replace: true
    })
  }
  
  const handleSubmitCourse = async (e) => {
    e.preventDefault();

      try{

         const obj = {};

        if(isPublished === true) {
          obj.isPublished = false;
          console.log("false")
        }else {
          obj.isPublished = true;
          console.log("true")
        }
        
        obj.id = courseId;

        updateCourse(obj);
        
        dispatch(
          uiActions.showAlert({
            status: "success",
            title: "Success!",
            message: "Your course published status has been updated",
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
    <div className="flex gap-4">
        <form onSubmit={handleSubmitCourse} >
            <button type="submitt" disabled={isDisabled} className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2' >{isPublished === true ? "Unpublish" : "Publish"}</button> 
        </form>
        <button onClick={() => handleRemoveCourse()} type="button" className="self-end justify-self-start focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm p-1 mb-2 "><MdDeleteOutline className="w-8 h-8" /></button>
    </div>
  );
};
