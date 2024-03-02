import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; 

import { useRemoveCourseMutation } from "../../store/courseApiSlice";

import { uiActions } from "../../store/ui-slice";

export const PublishedFrom = ({ isPublished, updateCourse, lessons, courseId }) => {
    
  const [isChecked, setIsChecked] = useState(isPublished);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsChecked(isPublished)
    return () => {};
  }, [isPublished])


  const [ removeCourse, isSuccess, isError ] = useRemoveCourseMutation()

  let navigate = useNavigate();

  const handleRemoveCourse = () => {
    removeCourse(courseId);

    if(isSuccess){
      dispatch(
        uiActions.showAlert({
          status: "success",
          title: "Success!",
          message: "Your course published status has been ",
        })
    );
    }

    navigate(`/my-course`, {
      replace: true
    })
  }
  
  const handleSubmitCourse = (e) => {
    e.preventDefault();

      try{

        updateCourse({ data: {isPublished: isChecked}, id: courseId});
        
        dispatch(
          uiActions.showAlert({
            status: "success",
            title: "Success!",
            message: "Your course published status has been ",
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

  const changeHandler = (e) => {
    setIsChecked(!isChecked)
  }

  return (
    <div className="grid grid-cols-2 w-1/3">
    <form onSubmit={handleSubmitCourse} className=" mt-8 ">
        <div className="flex mt-4">
            <h3 className="mr-2">publish</h3>
            <input type="checkbox" id="published" checked={isChecked}  onChange={changeHandler}/> 
        </div>
        <button disabled={lessons.length === 0} className="bg-black px-8 py-2 text-white cursor-pointer mt-4 block" type="submit" >
            Publish 
        </button> 
      </form>
      <button
        type=""
        onClick={handleRemoveCourse}
        className="bg-red-600 text-white px-8 py-2 self-end justify-self-start hover:bg-red-700"
      > 
      Delete
    </button>
    </div>
  );
};
