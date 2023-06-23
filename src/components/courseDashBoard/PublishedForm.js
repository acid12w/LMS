import React, { useState } from "react";
import { useParams } from "react-router-dom"; 



const parse = require("html-react-parser");


export const PublishedFrom = ({ isPublished, updateCourse, lessons }) => {
    
const params = useParams();

  const courseId = params.id;

  const [isChecked, setIsChecked] = useState(isPublished);
 
  const handleSubmitCourse = (e) => {
    e.preventDefault()
    
     if(lessons.length < 0){
        return
    }

    isPublished = isChecked;

    console.log(isPublished);

    updateCourse({ data: {isPublished}, id: courseId});
  } 

  const changeHandler = (e) => {
    setIsChecked(!isChecked)
  }

  return (
    
      <form onSubmit={handleSubmitCourse} className=" mt-8 ">
        <div className="w-2/3 block m-auto">
            <div className="flex mt-4">
                <h3 className="mr-2">publish</h3>
                <input type="checkbox" id="published" checked={isChecked} onChange={changeHandler}/> 
            </div>
            <button  className="bg-black px-8 py-2 text-white  mt-4 block" type="submit">
                Publish 
            </button> 
        </div>
      </form>
  );
};
