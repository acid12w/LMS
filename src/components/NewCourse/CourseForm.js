import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { useAddCourseMutation } from "../../store/courseApiSlice";

// import { WithContext as ReactTags } from "react-tag-input";

// import TextEditor from "../UI/TextEditor";

import useInput from "../../hooks/use-input";

import { ImageUpload } from "../UI/imageUpload";

import { uiActions } from "../../store/ui-slice";

export const CourseForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [addCourse] = useAddCourseMutation();

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

  // const handleData = (data) => {
  //   setOverview(data);
  // };

  // const handleDelete = (i) => {
  //   setTags(tags.filter((tag, index) => index !== i));
  // };

  // const handleAddition = (tag) => {
  //   setTags([...tags, tag]);
  // };


  // const handleDrag = (tag, currPos, newPos) => {
  //   const newTags = tags.slice();

  //   newTags.splice(currPos, 1);
  //   newTags.splice(newPos, 0, tag);

  //   // re-render
  //   setTags(newTags);
  // };

  // const handleTagClick = (index) => {
  //   console.log("The tag at index " + index + " was clicked");
  // };


  const isValid =
    courseNameisValid && subjectisValid && overviewisValid && imageUrlisValid;

  const handleOnSubmit = async (e) => {
     e.preventDefault();

     console.log( courseNameisValid, subjectisValid, difficulty, overviewisValid)

    if (!isValid) return;

    try{
      addCourse(
            {
              courseName: courseName,
              overview: overview,
              difficulty: difficulty  || 'beginner',
              subject: subject,
              completedCourses: 0,
              participants: 0,
              rated: 1,
              rating: 0,
              thumbNail: imageUrl,
              imageFull: true, 
            }
          )

          dispatch(
            uiActions.showAlert({
              status: "success",
              title: "Success!",
              message: "your course was created",
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

    restCourse();
    restSubject();
    restDifficulty();

    navigate({ pathname: "/my-course" });
  };

  return (
    <>
      <ImageUpload setImageUrl={setImageUrl} />
      <form onSubmit={handleOnSubmit} className="flex flex-col pb-44 w-2/3">
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
          
        {/* <div className="Tag mb-4">
          <h1 className="mb-4"> Tags </h1>
          <div>

            <ReactTags
              tags={tags}
              //   suggestions={suggestions}
              //   delimiters={delimiters}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              handleDrag={handleDrag}
              handleTagClick={handleTagClick}
              inputFieldPosition="bottom"
              autocomplete

            />
          </div>
        </div> */}
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
        {/* <div className="mb-12">
          <TextEditor handleChange={handleData} />
        </div> */}
        <div className="flex">
          <button
            type="submit"
            className="bg-black hover:bg-emerald-600  px-8 py-2 text-white  mt-4 block"
          >
            Save
          </button>
        </div>
      </form>
     
    </>
  );
};
