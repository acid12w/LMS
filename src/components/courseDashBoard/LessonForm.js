import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import { useDispatch } from "react-redux";

import { useAddLessonMutation, useRemoveLessonMutation, useGetLessonQuery  } from "../../store/lessonApiSlice";
import { GrClose } from "react-icons/gr";
import { uiActions } from "../../store/ui-slice";
import YoutubeEmbed from "../UI/YoutubeEmbeded";

export const LessonForm = ({courseId, lessons}) => {

const dispatch = useDispatch();
const [addLesson, { isLoading: isUpdating }] = useAddLessonMutation(); 
const [removeLesson,{ isLoading: isRemoving } ] = useRemoveLessonMutation();  
const {data} = useGetLessonQuery(courseId); 

const [lesson, setLesson] = useState({
    title: "",
    videoId: "",
    resource: "",
});


const handleLessons = (e) => {
    setLesson({ ...lesson, [e.target.id]: e.target.value });
};

const handleRemoveLesson = async (id) => {

    if(isRemoving){
        dispatch(
            uiActions.showAlert({
                status: "pending",
                title: "Sending!",
                message: "removing lesson...",
            })
        );
    }
    

    try{
        await removeLesson(id).unwrap();

        dispatch(
            uiActions.showAlert({
              status: "success",
              title: "Success!",
              message: "Lesson has been removed", 
            })
        );
    }catch(err){
        console.error(err);
        dispatch(
            uiActions.showAlert({
              status: "error",
              title: "Error!",
              message: err.data.message,
            })
        );
    }
}

const handleSubmit = async (e) => {
    e.preventDefault();
    
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
        if (!lesson.title || !lesson.resource || !lesson.videoId) return; 
        console.log('lesson')

        await addLesson({...lesson, courseId});

        dispatch(
            uiActions.showAlert({
              status: "success",
              title: "Success!",
              message: "Lesson has been added",
            })
        );

        lesson.title = '';
        lesson.videoId = '';
        lesson.resource = '';
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
    <div className="h-full">
        <div className="mb-4">
            {lessons?.map((lesson, index) => {
                return (
                <div
                    className="md:w-2/3 block p-4 bg-white shadow-md rounded-md mb-4 relative flex flex-col"
                    key={index}>
                    <h4 className="mb-2">Lessons title: {lesson.title}</h4>
                    <Link to={lesson.videoId} className="mb-2 text-green-600 ">
                        youtube link
                    </Link>
                    <YoutubeEmbed embedId={lesson.videoId}  width={50} height={280}/> 
                    <article className="mb-2 mt-2">Resources: {lesson.resource}</article>
           
                    <div
                    onClick={() => handleRemoveLesson(lesson._id) }
                    className="absolute top-0 right-0 p-1 bg-green-400"
                    >
                    <GrClose className="text-green-600" />
                    </div>
                </div>
                );
            })}
        </div>
        
        <form onSubmit={handleSubmit} className="md:w-2/3 ">
            <label>
            <input
                type="text"
                id="title"
                required
                value={lesson.title}
                onChange={handleLessons}
                placeholder="Lesson title"
                className="bg-gray-100 text-gray-500 h-full w-full border-none outline-none p-4 mb-1 mt-2 text-sm"
            />
            </label>
            <label>
            <input
                type="text"
                id="videoId"
                required
                value={lesson.videoId}
                onChange={handleLessons}
                placeholder="video"
                className="bg-gray-100 text-gray-500 h-full w-full border-none outline-none p-4 mb-1 mt-2 text-sm"
            />
            </label>
            <label>
            <textarea
                type="text"
                id="resource"
                required
                value={lesson.resource}
                onChange={handleLessons}
                placeholder="resource"
                className="bg-gray-100 text-gray-500 h-full w-full border-none outline-none p-4 mb-1 mt-2 text-sm"
            />
            </label>
            <button type="submit" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">add</button>
        </form>
    </div>
  );
};
