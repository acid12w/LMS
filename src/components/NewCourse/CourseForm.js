import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { useAddCourseMutation } from "../../store/courseApiSlice";

import { WithContext as ReactTags } from "react-tag-input";


import useInput from "../../hooks/use-input";

import { ImageUpload } from "../UI/imageUpload";

import { uiActions } from "../../store/ui-slice";

export const CourseForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [addCourse, { data, isLoading, error, isError, isSuccess }] = useAddCourseMutation();


  const [imageUrl, setImageUrl] = useState(null);
  const [tags, setTags] = React.useState([]);

  const tagisValid = tags.length > 0;
  const imageUrlisValid = imageUrl != null;

  const {
    value: courseName,
    isValid: courseNameisValid,
    hasError: courseNameHasError,
    valueChangeHandler: courseNameChangeHandler,
    inputBlurHandler: courseBlurHandler,
    rest: restCourse,
  } = useInput((value) => value.trim() !== "");

  const {
    value: subject,
    isValid: subjectisValid,
    hasError: subjectHasError,
    valueChangeHandler: subjectChangeHandler,
    inputBlurHandler: subjectBlurHandler,
    rest: restSubject,
  } = useInput((value) => value.trim() !== "");

  const {
    value: overview,
    isValid: overviewisValid,
    hasError: overviewHasError,
    valueChangeHandler: overviewChangeHandler,
    inputBlurHandler: overviewBlurHandler,
    rest: restoverview,
  } = useInput((value) => value.trim() !== "");

  const {
    value: difficulty,
    isValid: difficultyisValid,
    hasError: difficultyHasError,
    valueChangeHandler: difficultyChangeHandler,
    inputBlurHandler: difficultyBlurHandler,
    rest: restDifficulty,
  } = useInput((value) => value.trim() !== "");



  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };


  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  const isValid = courseNameisValid && subjectisValid && overviewisValid && imageUrlisValid;

  const handleOnSubmit = (e) => {
     e.preventDefault(); 
     

     if(!imageUrlisValid){
      dispatch(
        uiActions.showAlert({
            status: "error",
            title: "Error!",
            message: "No image uplaoded",
        })
      );
      return
     }

    if (!isValid) return;

    addCourse(
          {
            courseName: courseName,
            overview: overview,
            difficulty: difficulty  || 'beginner',
            subject: subject,
            completedCourses: 0,
            participants: 0,
            tags,
            rated: 1,
            rating: 0,
            thumbNail: imageUrl,
            imageFull: true, 
          }
        ).unwrap()
        .then(() => { 
          dispatch(
            uiActions.showAlert({
              status: "success",
              title: "Success!",
              message: "your course was created",
            })
          );
        navigate({ pathname: "/my-course" })
        })
        .catch((error) => {
          dispatch(
            uiActions.showAlert({
              status: "error",
              title: "Error!",
              message: error.data.message ,
            })
          );
        })
  };

  return (
    <> 
      <ImageUpload setImageUrl={setImageUrl} />
      <form onSubmit={handleOnSubmit} className="flex flex-col pb-44 md:w-2/3">
       
      <label className="text-sm mr-4 h-12 mt-2 mb-10">
          Course name
          <input
            type="text"
            id="courseName"
            required
            value={courseName}
            onBlur={courseBlurHandler}
            onChange={courseNameChangeHandler}
            placeholder="Course name"
            className={`${"bg-gray-100 text-gray-500 h-full w-full border-none outline-none p-4 mt-1 rounded-md focus:text-black"} ${
              courseNameHasError ? "outline outline-red-600" : ""
            }`}
          />
          {courseNameHasError && (
            <p className=" text-red-400 mt-2 ml-1">
              Course name must not be empty
            </p>
          )}
      </label>

      <label className="text-sm mr-4 h-12 mt-2 mb-12">
          Search subject
          <input
              type="text"
              list="subject"
              required
              value={subject}
              onBlur={subjectBlurHandler}
              onChange={subjectChangeHandler}
              placeholder="Search subjects..."
              className={`${"bg-gray-100 text-gray-500 h-full w-full p-4 mt-1 rounded-md focus:text-black"} ${
                subjectHasError ? "outline outline-red-600" : ""
              }`}
          />
            <datalist id="subject" required className={`${"bg-gray-100 text-gray-500 h-full w-full p-4 mt-1 rounded-md focus:text-black"} ${
                subjectHasError ? "outline outline-red-600" : ""
              }`}>
              <option value="Math"></option>
              <option value="English"></option>
              <option value="Chemistry"></option>
            </datalist>
            {subjectHasError && (
              <p className="text-red-400 ml-1 focus:text-black">
                subject must not be empty
              </p>
            )}
            </label>
       
         
            <label className="text-sm mr-4 h-12 mb-10"> 
            Difficulty
            <select
              defaultValue={difficulty}
              onChange={difficultyChangeHandler}
              name="difficulty"
              id="difficulty"
              required
              className="bg-gray-100 text-gray-500 h-full w-full border-none outline-none p-1 focus:text-black"
            >
              <option value="beginner" >Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            </label>
            {difficultyHasError && (
              <p className=" text-red-400 mt-2 ml-1">
                difficulty must not be empty
              </p>
            )}
          
        <div className="Tag mb-4">
          <h1 className="mb-4"> Tags </h1>
          <div>

            <ReactTags
              tags={tags}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              handleDrag={handleDrag}
              handleTagClick={handleTagClick}
              inputFieldPosition="bottom"
              autocomplete
            />
          </div>
        </div>
        <label className="text-sm mr-4 mt-2">
            Overview
            <textarea
              type="text"
              list="subject"
              required
              value={overview}
              onBlur={overviewBlurHandler}
              onChange={overviewChangeHandler}
              placeholder="Overview..."
              className={`${"bg-gray-100 text-gray-500 h-36 w-full border-none outline-none p-4 mb-1 mt-2 rounded-md"} ${
                overviewHasError ? "outline border-red-100" : ""
              }`}
          />
          </label> 
        <div className="flex">
        <button type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
        </div>
      </form>
     
    </>
  );
};