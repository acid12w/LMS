import TextEditor from "../UI/TextEditor";

import { AiFillPlusCircle } from "react-icons/ai";

export const NewLesson = ({
  onPrevStep,
  addLesson,
  hasError,
  formData,
  onBlurHandler,
  onHandleChange,
  onHandleChangeData,
}) => {
  const { lessonTitle, youtubelink } = formData;
  const { lessonTitleHasError, youtubelinkHasError } = hasError;
  const { lessonTitleBlurHandler, youtubelinkBlurHandler } = onBlurHandler;
  const { lessonTitleChangeHandler, youtubelinkChangeHandler } = onHandleChange;

  return (
    <>
      <div className="mb-12">
        {/* <label className="p-1">Course Name</label> */}
        <input
          type="text"
          id="Title"
          value={lessonTitle}
          onBlur={lessonTitleBlurHandler}
          onChange={lessonTitleChangeHandler}
          placeholder="lesson title"
          className={`${"bg-gray-100 h-full w-full border-none outline-none p-4"} ${
            lessonTitleHasError ? "bg-red-100" : ""
          }`}
        />
      </div>

      <div className="mb-12 flex j justify-evenly items-center">
        {/* <label className="p-1">Course Name</label> */}
        <div>
          <h4>Lesson video</h4>
          <h5 className="text-sm text-gray-500">
            upload your youtube then add a lesson
          </h5>
        </div>
        <div className="p-6 flex flex-col items-center">
          <input
            type="text"
            id="Title"
            value={youtubelink}
            onBlur={youtubelinkBlurHandler}
            onChange={youtubelinkChangeHandler}
            placeholder="youtube link"
            className={`${"bg-gray-100 h-full w-72 border-none outline-none p-4 mb-4"} ${
              youtubelinkHasError ? "bg-red-100" : ""
            }`}
          />
        </div>
      </div>

      <div className="mb-12">
        <label className="p-1 mb-4">Lesson resource</label>
        <TextEditor handleChange={onHandleChangeData("resource")} />
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => onPrevStep()}
          className="bg-green-500 px-4 py-2 mr-4 text-green-800 font-semibold my-2 rounded flex"
        >
          prev
        </button>
        <button
          type="button"
          onClick={addLesson}
          className="bg-green-500 px-4 py-2 mr-4 text-green-800 font-semibold my-2 rounded flex"
        >
          <AiFillPlusCircle className="w-6 h-6 text-green-800 mr-2" /> add
        </button>
        <button
          type="submit"
          className="bg-green-500 px-4 py-2 text-green-800 font-semibold my-2 rounded"
        >
          Submit
        </button>
      </div>
    </>
  );
};
