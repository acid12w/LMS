import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useAddCommentMutation, useAddReplyMutation } from "../../../store/commentApiSlice";

export const CommentForm = (props) => {
  const commentText = useRef();
  
  const username =  useSelector((state) => state.auth.user.currentUsername)

  const  [addComment]  = useAddCommentMutation();
  const [addReply] = useAddReplyMutation();

  const lessonId  = props.lessonId;

  const submitFormHandler = (e) => {
    e.preventDefault();

    const enteredText = commentText.current.value;
    if (enteredText.trim() === "") return; 
    
    if (props.type === "comment") {
      addComment({  username: username ,lessonId, text: enteredText }) 
    }
    if (props.type === "reply") {
      addReply({lessonId, reply: { username: username, text: enteredText } });
    }
    commentText.current.value = "";  
  };

  return (
    <div className="flex pb-12 w-8/12 ">
      {/* <span className="h-16 w-16 bg-green-700 text-white font-bold rounded-full p-5 mr-4 mt-4">
        AA
      </span> */}
      <form onSubmit={submitFormHandler} className=" p-2 w-full">
        <textarea
          type="text"
          ref={commentText}
          placeholder={props.placeholder}
          className=" bg-gray-100 w-full h-20 p-2"
        />
        <button
          type="submit"
          className="bg-green-500 px-4 py-2 text-green-800 font-semibold my-2 float-right flex"
        >
          Post
        </button>
        <button
          type="button"
          onClick={() => props.togglShowForm()}
          className="px-4 py-2 text-green-800 text-sm font-semibold my-2 float-right "
        >
          CANCEL
        </button>
      </form>
    </div>
  );
};
