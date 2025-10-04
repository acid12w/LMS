import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; 

import { useRemoveCourseMutation } from "../../store/courseApiSlice";

import { uiActions } from "../../store/ui-slice";

import { MdDeleteOutline } from "react-icons/md";

export const PublishedFrom = ({ isPublished, updateCourse, lessons, courseId }) => {
    
  const [isChecked, setIsChecked] = useState(isPublished);
  const [togglePopup, setTogglePopup] = useState(false);

 

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
    <div className="flex gap-4">
    <form onSubmit={handleSubmitCourse} className=" mt-8 ">
        
        <div onMouseEnter={() => setTogglePopup(true)} onMouseLeave={() => setTogglePopup(false)}>
          <button disabled={isDisabled} type="submit" className={`${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'} focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-6 py-2.5 me-2 mb-2`} >Published</button>
        </div>
        <div data-popover id="popover-animation" role="tooltip" className={`absolute z-10 ${togglePopup ? 'visible opacity-1' : "invisible opacity-0" } inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm `}>
            <div className="px-3 py-3 bg-gray-100 border-b border-gray-200 rounded-t-lg">
                <h3 className="font-semibold text-gray-900 ">Notice</h3>
            </div>
            <div class="px-3 py-2">
                <p>You must add atleast one lesson before publishing</p>
            </div>
            <div data-popper-arrow></div>
        </div>
        
      </form>
      
      <button onClick={handleRemoveCourse} className="self-end justify-self-start focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"><MdDeleteOutline className="w-6 h-6" /></button>
    </div>
  );
};
