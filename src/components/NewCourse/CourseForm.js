import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { useAddCourseMutation } from "../../store/courseApiSlice";

// import { WithContext as ReactTags } from "react-tag-input";

import TextEditor from "../UI/TextEditor";

import useInput from "../../hooks/use-input";

import { ImageUpload } from "../UI/imageUpload";

import { uiActions } from "../../store/ui-slice";

export const CourseForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [addCourse] = useAddCourseMutation()
  const alert = useSelector((state) => state.ui.Alert);

  const [imageUrl, setImageUrl] = useState(null);
  const [tags, setTags] = React.useState([]);
  const [overview, setOverview] = useState();

  const tagisValid = tags.length > 0;
  const imageUrlisValid = imageUrl != null;
  const overviewisValid = overview != null;

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
    value: difficulty,
    isValid: difficultyisValid,
    hasError: difficultyHasError,
    valueChangeHandler: difficultyChangeHandler,
    inputBlurHandler: difficultyBlurHandler,
    rest: restDifficulty,
  } = useInput((value) => value.trim() !== "");

  const handleData = (data) => {
    setOverview(data);
  };

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


  const isValid =
    courseNameisValid && subjectisValid && difficultyisValid && tagisValid && overviewisValid;

  const handleOnSubmit = async (e) => {
     e.preventDefault();

    if (!isValid) return;

    try{
      addCourse(
            {
              courseName: courseName,
              overview: overview,
              difficulty: difficulty  || 'beginner',
              subject: subject,
              tags: tags,
              completedCourses: 0,
              participants: 0,
              rated: 1,
              rating: 0,
              // thumbNail: imageUrl,
              imageFull: true, 
            }
          )

          dispatch(
            uiActions.showAlert({
              status: "sucsess",
              title: "Sucess!",
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
      <form onSubmit={handleOnSubmit}>
        <div className="mb-12">
          <input
            type="text"
            id="courseName"
            required
            value={courseName}
            onBlur={courseBlurHandler}
            onChange={courseNameChangeHandler}
            placeholder="Course name"
            className={`${"bg-gray-100 h-full w-full border-none outline-none p-4 focus:text-black focus:invalid: bg-blue-100"} ${
              courseNameHasError ? "bg-red-100" : ""
            }`}
          />
          {courseNameHasError && (
            <p className=" text-red-400 mt-2 ml-1">
              Course name must not be empty
            </p>
          )}
        </div>
        <div className="flex justify-between mb-12">
          <div className="w-3/6 mr-4">
            <input
              type="text"
              list="subject"
              required
              value={subject}
              onBlur={subjectBlurHandler}
              onChange={subjectChangeHandler}
              placeholder="Search subjects..."
              className={`${"bg-gray-100 h-full w-full border-none outline-none pl-4 focus:text-black focus:invalid: bg-blue-100"} ${
                subjectHasError ? "bg-red-100" : ""
              }`}
            />
            <datalist id="subject" required>
              <option value="Math"></option>
              <option value="English"></option>
              <option value="Chemistry"></option>
            </datalist>
            {subjectHasError && (
              <p className=" text-red-400 mt-2 ml-1 focus:text-black focus:invalid: bg-blue-100">
                subject must not be empty
              </p>
            )}
          </div>
          <div className="w-1/3 p-4">
            <label className="mr-4">Difficulty :</label>
            <select
              value={difficulty}
              onChange={difficultyChangeHandler}
              name="difficulty"
              id="difficulty"
              required
            >
              <option value="beginner" >Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            {difficultyHasError && (
              <p className=" text-red-400 mt-2 ml-1">
                difficulty must not be empty
              </p>
            )}
          </div>
        </div>
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
        <div className="mb-12">
          <TextEditor handleChange={handleData} />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            // onClick={nextStep}
            className="bg-green-500 px-4 py-2 mr-4 text-green-800 font-semibold my-2 rounded flex"
          >
            Save
          </button>
        </div>
      </form>
     
    </>
  );
};
