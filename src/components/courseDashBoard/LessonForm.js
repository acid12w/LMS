import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import { useDispatch } from "react-redux";

import { useAddLessonMutation, useRemoveLessonMutation, useGetLessonQuery  } from "../../store/lessonApiSlice";
import { GrClose } from "react-icons/gr";
import { uiActions } from "../../store/ui-slice";

export const LessonForm = ({courseId}) => {

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
            {data?.map((lesson, index) => {
                return (
                <div
                    className="w-2/3 block m-auto p-4 bg-gray-100 mb-4 relative"
                    key={index}
                >
                    <div className="flex">
                    <h4 className="mb-2">Lessons title: {lesson.title}</h4>
                    </div>
                    <div className="flex">
                    <Link to={lesson.videoId} className="mb-2 text-green-600">
                        youtube link
                    </Link>
                    </div>
                    <div className="flex">
                    <article className="mb-2">Resources: {lesson.resource}</article>
                    </div>
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
        
        <form onSubmit={handleSubmit} className="w-2/3 block m-auto">
            <input
                type="text"
                id="title"
                required
                value={lesson.title}
                onChange={handleLessons}
                placeholder="Lesson title"
                className="bg-gray-100 h-full w-full border-none outline-none p-4 mb-4 focus:text-black focus:invalid: bg-blue-100"
            />
            <input
                type="text"
                id="videoId"
                required
                value={lesson.videoId}
                onChange={handleLessons}
                placeholder="video"
                className="bg-gray-100 h-full w-full border-none outline-none p-4 mb-4 focus:text-black focus:invalid: bg-blue-100"
            />
            <textarea
                type="text"
                id="resource"
                required
                value={lesson.resource}
                onChange={handleLessons}
                placeholder="resource"
                className="bg-gray-100 h-full w-full border-none outline-none p-4 focus:text-black focus:invalid: bg-blue-100"
            />

            <button
                type="submit"
                className="bg-black px-8 py-2 text-white  mt-4 block"
            >
                add
            </button>
        </form>
    </div>
  );
};
