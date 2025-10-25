import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

import { useAddLessonMutation, useGetLessonByCourseIdQuery} from "../../store/lessonApiSlice";

import { useUpdateCourseMutation } from "../../store/courseApiSlice";
import { ImageUpload } from "../UI/imageUpload";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoMdApps } from 'react-icons/io';


import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);


export const CousreFrom = ({ myCourses }) => {

const dispatch = useDispatch();
const params = useParams();
const navigate = useNavigate(); 

const [updateCourse, {isLoading: isUpdating}] = useUpdateCourseMutation();
const [addLesson] = useAddLessonMutation(); 

const courseId = params["*"];

const {data} = useGetLessonByCourseIdQuery(courseId); 

const currentCourse = myCourses;

const [image, setImage] = useState();


useEffect(() => {
    setItems(data)
  },[data]);


  const [editState, setToggleEditState] = useState({
    courseName: true,
    subject: true,
    description: true,
    lesson: true,
  }); 


  
  const [items, setItems] = useState(null);
  const [dragIndex, setDragIndex] = useState(null);
  

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDragStart = (index) => {
    setDragIndex(index)
  }


  const handleDrop = function (index) {
      const newItems = [...items];
      const draggedItem = newItems[dragIndex]
      newItems.splice(dragIndex, 1);
      newItems.splice(index, 0, draggedItem);
      setItems(newItems);
      setDragIndex(null);
      // gsap.to(draggedItem, { y: 0, duration: 0.3 });
    }
      


  const handleToggle = (key) => {
    setToggleEditState(prevToggles => ({
      ...prevToggles,
      [key]: !prevToggles[key], // Toggle the specific state using the key
    }));
  };

  const courseNameInput = useRef();
  const overviewInput = useRef();
  const subjectInput = useRef();
  const difficultyInput = useRef();
  const lessonInput = useRef();

  console.log(courseNameInput)


  if(!data){
    return<p>loading</p>;
  }
   
 const navTo = (id) => {
    navigate(`/my-lesson/${courseId}/${id}`, {
      replace: true,
    });
  };
 


  const handleCourseNameSubmitt = async (e) => {
    e.preventDefault();

    if(isUpdating){
      dispatch(
          uiActions.showAlert({
              status: "pending",
              title: "Sending!",
              message: "Course is beeing added",
          })
      );
    }

    
    try{
        const data = {};
        const courseName = courseNameInput?.current?.value.trim();
        const overview = overviewInput?.current?.value.trim();
        const subject = subjectInput?.current?.value.trim();
        const difficulty = difficultyInput?.current?.value.trim();


        if(courseName)  data.courseName = courseName;        
        if(overview)  data.overview = overview; 
        if(subject)  data.subject = subject;
        // if(difficulty !== '' )  data.courseName = difficulty;
        console.log(data)

        data.id = courseId
        
        await updateCourse({data, id: courseId});

        dispatch(
          uiActions.showAlert({
            status: "success",
            title: "Success!",
            message: "Course has been successfully updated",
          })
      );
    }catch(err){
      dispatch(
        uiActions.showAlert({
          status: "error",
          title: "Error!",
          message: err.data,
        })
    );
    }
  }

  const handleLessonSubmit = async (e) => {
      e.preventDefault();

      const title = lessonInput.current.value.trim();
      
      if(isUpdating){
          dispatch(
              uiActions.showAlert({
                  status: "pending",
                  title: "Sending!",
                  message: "Lesson is beeing added",
              })
          );
      }
  
      try{

          await addLesson({title, courseId});
  
          dispatch(
              uiActions.showAlert({
                status: "success",
                title: "Success!",
                message: "Lesson has been added",
              })
          );

      }catch(err){
          dispatch(
              uiActions.showAlert({
                status: "error",
                title: "Error!",
                message: "sending failed",
              })
          );
      }
      
  };



  return (
  <div className="flex gap-x-4 flex-wrap">
    
    <div className="w-full md:w-[48%] mb-6">
    <div className="flex items-center gap-x-4 mb-8">
        <div className="p-1 rounded-full bg-green-100"><MdOutlineDashboardCustomize className="w-[30px] h-[30px] fill-green-700" /></div> 
        <p>Customize your course</p>
    </div> 
      <div className="bg-[#e6efe9] p-4 rounded-md mb-4 flex justify-center">
          <ImageUpload setImageUrl={setImage} thumbNail={currentCourse.thumbNail}/>
      </div>
    
      <div className="bg-[#e6efe9] p-4 rounded-md">
          <div className="flex justify-between mb-4"><p>Course name</p> <button onClick={() => handleToggle("courseName")} className="text-gray-800 text-xs px-4 py-1 flex items-center rounded">{editState.courseName ? <p className="flex gap-x-3"><MdOutlineModeEdit className="w-6 h-6" /> Edit</p> : <p > Cencel</p>}</button></div> 
          { !editState.courseName || <p className="text-sm text-gray-600">{currentCourse.courseName}</p>}
          {editState.courseName ||<form onSubmit={handleCourseNameSubmitt} className="flex flex-col gap-6 items-left" >
            <label className="text-sm ">
            <input
            type="text"
            id="courseName"
            ref={courseNameInput}
            key={currentCourse.courseName}
            defaultValue={currentCourse.courseName}
            className="bg-white text-gray-500 h-full rounded-md w-full border-none outline-none p-4"
            />
          </label>
          <button type="submitt" className="w-min focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Save</button>   
        </form>}
      </div>

      <div className="bg-[#e6efe9] p-4 rounded-md mt-4">
          <div className="flex justify-between mb-4"><p>Subject</p> <button onClick={() => handleToggle("subject")} className="text-gray-800 text-xs px-4 py-1 flex items-center rounded">{editState.subject ? <p className="flex gap-x-3"><MdOutlineModeEdit className="w-6 h-6" /> Edit</p> : <p > Cencel</p>}</button></div> 
          { !editState.subject || <p className="text-sm text-gray-600">{currentCourse.subject}</p>}
          {editState.subject ||<form onSubmit={handleCourseNameSubmitt} className="flex flex-col gap-6 items-left">
            <label className="text-sm">
            <input
            type="text"
            id="Subject"
            ref={subjectInput}
            key={currentCourse.subject}
            defaultValue={currentCourse.subject}
            className="bg-white text-gray-500 h-full rounded-md w-full border-none outline-none p-4"
            />
          </label>
          <button type="submitt" className="w-min focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Save</button>   
        </form>}
      </div>

      <div className="bg-[#e6efe9] px-4 py-2 rounded-md mt-4">
          <div className="flex justify-between mb-4"><p>Description</p> <button onClick={() => handleToggle("description")} className="text-gray-800 text-xs px-4 py-1 flex items-center rounded">{editState.description ? <p className="flex gap-x-3"><MdOutlineModeEdit className="w-6 h-6" /> Edit</p>: <p > Cencel</p>}</button></div> 
          { !editState.description || <p className="text-sm text-gray-600">{currentCourse.overview}</p>}
          {editState.description ||<form onSubmit={handleCourseNameSubmitt} className="flex flex-col gap-6 items-left" >
          <label className="text-sm">
            <textarea
            type="text"
            id="overview"
            ref={overviewInput}
            key={currentCourse.overview}
            defaultValue={currentCourse.overview}
            className="bg-white text-gray-500 h-36 w-full border-none outline-none p-4" 
            />
          </label>
          <button type="submitt" className="w-min focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Save</button>   
        </form>}
      </div>

      {/* <div className="bg-[#e6efe9] p-4 rounded-md mt-4">
          <div className="flex justify-between mb-4"><p>Difficulty</p> <button onClick={() => handleToggle("subject")} className="text-gray-800 text-xs px-4 py-1 flex items-center rounded">{editState.subject ? <p className="flex gap-x-3"><MdOutlineModeEdit className="w-6 h-6" /> Edit</p> : <p > Cencel</p>}</button></div> 
          { !editState.subject || <p className="text-sm text-gray-600">{currentCourse.subject}</p>}
          {editState.subject ||<form onSubmit={handleCourseNameSubmitt} className="flex flex-col gap-6 items-left">
            <label className="text-sm mr-4 h-12 mb-10"> 
              
              <select
              // onChange={difficultyChangeHandler}
              name="difficulty"
              id="difficulty"
              ref={difficultyInput}
              key={currentCourse.difficulty}
              defaultValue={currentCourse.difficulty}
              className="bg-gray-100 text-gray-500 h-full w-full border-none outline-none p-4 focus:text-black"
              >
              <option value="beginner" >Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              </select>
            </label>
          <button type="submitt" className="w-min focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Save</button>   
        </form>}
      </div> */}

 

    </div>

    <div className="w-full md:w-[48%]">
      <div className="flex items-center gap-x-4 mb-8">
        <div className="p-1 rounded-full bg-green-100"><MdOutlineDashboardCustomize className="w-[30px] h-[30px] fill-green-700" /></div> 
        <p>Customize your lesson</p>
      </div> 
      <div className="bg-[#e6efe9] p-4 rounded-md flex flex-col gap-4">
          <div className="flex justify-between"><p>Lessons</p> <button onClick={() => handleToggle("lesson")} className="text-gray-800 text-xs px-4 py-1 flex items-center rounded">{editState.lesson ? <p className="flex"><MdOutlineModeEdit className="w-6 h-6" /> Add a lesson</p> : <p > Cencel</p>}</button></div> 
        <div className="reorderable-list">
        {items?.map((lesson, index )=> {
            return(
                <div 
                key={index} 
                draggable
                onDragStart={()=> handleDragStart(index)} 
                onDragOver={handleDragOver} 
                onDrop={()=> handleDrop(index)}  
                className={`${lesson.isPublished ? "bg-green-300" : "bg-gray-300"} p-2  rounded-md flex justify-between mb-4`}>
                  <div className="flex items-center">
                  <IoMdApps className={`h-8 w-8 border-r  cursor-pointer  ${lesson.isPublished ? "fill-green-600 border-green-400 hover:bg-gray-400" : "fill-gray-600 border-gray-400 hover:bg-gray-400"}`}/>
                  <p className="text-xs ml-4">{lesson?.title}</p>
                  </div>
                  <div className="flex">
                    <span className={`${lesson.isPublished ? "bg-green-500" : "bg-gray-500"}  pt-4 px-[14px] py-[0px] text-xs text-white leading-8 rounded-full`}>{lesson.isPublished ? "Published" : "Draft"}</span>
                    <button onClick={() => navTo(lesson._id)} className="text-green-800 text-xs px-4 py-1 flex items-center rounded">{<MdOutlineModeEdit className="w-6 h-6" />}</button>
                  </div>
                </div>
            )
          }) 
        }
        </div>

       
          {editState.lesson ||<form onSubmit={handleLessonSubmit} className="">
            <label className="text-sm">
            <input
            type="text"
            id="Subject"
            ref={lessonInput}
            key={currentCourse.courseName}
            defaultValue="lesson"
            className="bg-white text-gray-500 h-full rounded-md w-full border-none outline-none p-4"
            />
          </label>
          <button type="submitt" className="mt-4 block focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Create</button>   
        </form>}
      </div>
    </div>
      
        
    
          {/* <label className="text-sm mr-4 h-12 mt-2">
            Subject
            <input
            type="text"
            id="firstName"
            ref={subjectInput}
            key={currentCourse.courseName}
            defaultValue={currentCourse.subject}
            className="bg-gray-100 text-gray-500 h-full w-full border-none outline-none p-4 mb-1 mt-2"
            />
          </label>  */}

          {/* <label className="text-sm mr-4 h-12 mb-10"> 
              Difficulty
              <select
              // onChange={difficultyChangeHandler}
              name="difficulty"
              id="difficulty"
              ref={difficultyInput}
              key={currentCourse.difficulty}
              defaultValue={currentCourse.difficulty}
              className="bg-gray-100 text-gray-500 h-full w-full border-none outline-none p-4 focus:text-black"
              >
              <option value="beginner" >Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              </select>
            </label>

          <label className="text-sm mr-4 h-12 mt-2">
            Description
            <textarea
            type="text"
            id="firstName"
            ref={overviewInput}
            key={currentCourse.overview}
            defaultValue={currentCourse.overview}
            className="bg-gray-100 text-gray-500 h-36 w-full border-none outline-none p-4 mb-1 mt-2" 
            />
          </label> 

          <label>
            Background image full
            <input 
            className="ml-1" 
            type="checkbox" 
            checked={isChecked} 
            id="imageFull" 
            onChange={changeHandler}/> 
          </label>   
          <button type="submit" className="mt-4 block focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Save</button>   
         */}
        </div>
  );
};