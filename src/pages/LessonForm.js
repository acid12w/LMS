import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import { useDispatch } from "react-redux";
import { uiActions } from "../store/ui-slice";

import { useUpdateLessonMutation, useGetLessonQuery } from "../store/lessonApiSlice";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { MdOutlineVideocam } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosArrowRoundBack } from "react-icons/io";


import YoutubeEmbed from "../components/UI/YoutubeEmbeded";



 const LessonForm = () => {

const dispatch = useDispatch();
const params = useParams();
const navigate = useNavigate(); 


const [updateLesson, { lessonIsLoading: lessonIsUpdating }] = useUpdateLessonMutation(); 

const lessonId = params.id;

const {data} = useGetLessonQuery(lessonId); 
console.log(data)
const currentLesson = data?.find((course) => course._id === lessonId);

const [editState, setToggleEditState] = useState({
  courseName: true,
  subject: true,
  video: true,
  lesson: true,
});

  const handleToggle = (key) => {
    setToggleEditState(prevToggles => ({
      ...prevToggles,
      [key]: !prevToggles[key], // Toggle the specific state using the key
    }));
  };

  const titleInput = useRef();
  const descriptionInput = useRef();
  const videoIdInput = useRef();


  if(!data){
    return<p>loading</p>;
  }


  const goBack = () => {
      navigate(-1); // Navigates to the previous page
    };


  const handleCourseNameSubmitt = async (e) => {
    e.preventDefault();

    if(lessonIsUpdating){
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
        const title = titleInput?.current?.value.trim();
        const overview = descriptionInput?.current?.value.trim();
        const videoId = videoIdInput?.current?.value.trim();

        if(title !== '' )  data.title = title;
        if(overview !== '' )  data.resource = overview;
        if(videoId !== '' )  data.videoId = videoId;
        data.id = lessonId;
        
        await updateLesson({data});

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
          message: err.data.message,
        })
    );
  }
}



  return (
  <div className="p-10">
    <div className="pb-8">
        <span className="cursor-pointer flex items-center mb-8" onClick={()=> goBack()}><IoIosArrowRoundBack className="w-6 h-6"/> <p className="text-xs">Back to course</p></span>
        <h2 className="text-xl font-semi-bold">Lesson creation</h2>
    </div>
  <div className="flex gap-x-4">
    
      <div className="w-1/2">
        <div className="flex items-center gap-x-4 mb-8">
          <div className="p-1 rounded-full bg-green-100"><MdOutlineDashboardCustomize className="w-[30px] h-[30px] fill-green-700" /></div> 
          <p>Customize your lesson</p>
        </div>      
        <div className="bg-[#e0eae3] p-4 rounded-md">
            <div className="flex justify-between mb-4"><p>Lesson title</p> <button onClick={() => handleToggle("courseName")} className="text-gray-800 text-xs px-4 py-1 flex items-center rounded">{editState.courseName ? <p className="flex gap-x-3"><MdOutlineModeEdit className="w-6 h-6" /> Edit</p> : <p > Cencel</p>}</button></div> 
            { !editState.courseName || <p className="text-sm text-gray-600">{currentLesson.title}</p>}
            {editState.courseName ||<form onSubmit={handleCourseNameSubmitt} className="flex flex-col gap-6 items-left" >
              <label className="text-sm ">
              <input
              type="text"
              id="Titile"
              ref={titleInput}
              key={currentLesson.title}
              defaultValue={currentLesson.title}
              className="bg-white text-gray-500 h-full rounded-md w-full border-none outline-none p-4"
              />
            </label>
            <button type="submitt" className="w-min focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Save</button>   
          </form>}
        </div>
  
        <div className="bg-[#e0eae3] p-4 rounded-md mt-4">
            <div className="flex justify-between mb-4"><p>Description</p> <button onClick={() => handleToggle("subject")} className="text-gray-800 text-xs px-4 py-1 flex items-center rounded">{editState.subject ? <p className="flex gap-x-3"><MdOutlineModeEdit className="w-6 h-6" /> Edit</p> : <p > Cencel</p>}</button></div> 
            { !editState.subject || <p className="text-sm text-gray-600">{currentLesson.resource}</p>}
            {editState.subject ||<form onSubmit={handleCourseNameSubmitt} className="flex flex-col gap-6 items-left">
              <label className="text-sm">
              <input
              type="text"
              id="Description"
              ref={descriptionInput}
              key={currentLesson.resource}
              defaultValue={currentLesson.resource}
              className="bg-white text-gray-500 h-full rounded-md w-full border-none outline-none p-4"
              />
            </label>
            <button type="submitt" className="w-min focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Save</button>   
          </form>}
        </div>

         <div className="grid grid-cols-2 md:w-1/3">
      <form  className="flex gap-4 mt-4">
          <button  type="submit" className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2' >Published</button>
          <button  className="self-end justify-self-start focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm p-4 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"><MdDeleteOutline className="w-6 h-6" /></button>
      </form>
      
    </div>
        
      </div>
  
      <div className="w-1/2">
       <div className="flex items-center gap-x-4 mb-8">
          <div className="p-1 rounded-full bg-emerald-100"><MdOutlineVideocam className="w-[30px] h-[30px] fill-emerald-700" /></div> 
          <p>Add a video</p>
        </div>

        <div className="bg-[#e0eae3] p-4 rounded-md flex flex-col gap-4">
            <div className="flex justify-between mb-4"><p>Lesson video</p> <button onClick={() => handleToggle("video")} className="text-gray-800 text-xs px-4 py-1 flex items-center rounded">{editState.video ? <p className="flex gap-x-3"><MdOutlineModeEdit className="w-6 h-6" /> Edit</p> : <p > Cencel</p>}</button></div> 
            {editState.video ||<form onSubmit={handleCourseNameSubmitt} className="flex flex-col gap-6 items-left">
              <label className="text-sm">
              <input
              type="text"
              id="video"
              ref={videoIdInput}
              key={currentLesson.videoId}
              defaultValue="youtube video"
              className="bg-white text-gray-500 h-full rounded-md w-full border-none outline-none p-4"
              />
            </label>
            <button type="submitt" className="w-min focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Save</button>   
          </form>}
          {currentLesson?.videoId && <YoutubeEmbed embedId={currentLesson.videoId} width={90} height={680}/>}
        </div>

      </div>
    </div>
    </div>
  );
};


export default LessonForm;