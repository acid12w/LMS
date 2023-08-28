import React, { useState, useEffect } from "react";


export const PublishedFrom = ({ isPublished, updateCourse, lessons, courseId }) => {
    
  const [isChecked, setIsChecked] = useState(isPublished);

  useEffect(() => {
    setIsChecked(isPublished)
    return () => {};
  }, [isPublished])

  
  const handleSubmitCourse = (e) => {
    e.preventDefault()
    updateCourse({ data: {isPublished: isChecked}, id: courseId});
  } 

  const changeHandler = (e) => {
    setIsChecked(!isChecked)
  }

  return (
    
      <form onSubmit={handleSubmitCourse} className=" mt-8 ">
        <div className="w-2/3 block m-auto">
            <div className="flex mt-4">
                <h3 className="mr-2">publish</h3>
                <input type="checkbox" id="published" checked={isChecked}  onChange={changeHandler}/> 
            </div>
            <button disabled={lessons.length === 0} className="bg-black px-8 py-2 text-white  mt-4 block" type="submit" >
                Publish 
            </button> 
        </div>
      </form>
  );
};
