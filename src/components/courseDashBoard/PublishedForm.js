import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; 

import { useRemoveCourseMutation } from "../../store/courseApiSlice";

import { uiActions } from "../../store/ui-slice";

export const PublishedFrom = ({ isPublished, updateCourse, lessons, courseId }) => {
    
  const [isChecked, setIsChecked] = useState(isPublished);
  const [togglePopup, setTogglePopup] = useState(false);

  console.log(togglePopup)

  const dispatch = useDispatch();

  const isDisabled = lessons?.length === 0;

  useEffect(() => {
    setIsChecked(isPublished)
    return () => {};
  }, [isPublished])


  const [ removeCourse, isSuccess, isError ] = useRemoveCourseMutation()

  let navigate = useNavigate();

  const hadletoggle = () => {
    console.log('toggle')
  }

  const handleRemoveCourse = () => {
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


    if(isError){
      dispatch(
        uiActions.showAlert({
          status: "error",
          title: "Error!",
          message: "Error",
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
            message: "Your course published status has been updated",
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
        <div className="flex my-2">
            <h3 className="mr-2">publish</h3>
            <input type="checkbox" id="published" checked={isChecked}  onChange={changeHandler}/> 
        </div>
        <div onMouseEnter={() => setTogglePopup(true)} onMouseLeave={() => setTogglePopup(false)}>
          <button disabled={isDisabled} type="submit" className={`${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'} focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`} >Published</button>
        </div>
        <div data-popover id="popover-animation" role="tooltip" className={`absolute z-10 ${togglePopup ? 'visible opacity-1' : "invisible opacity-0" } inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm  dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800`}>
            <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Notice</h3>
            </div>
            <div class="px-3 py-2">
                <p>You must add atleast one lesson before publishing</p>
            </div>
            <div data-popper-arrow></div>
        </div>
        
      </form>
      
      <button onClick={handleRemoveCourse} class="self-end justify-self-start focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Delete</button>
    </div>
  );
};
