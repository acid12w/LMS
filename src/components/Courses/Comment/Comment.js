import { useState } from "react";
import { CommentForm } from "./CommentForm";
import { Reply } from "./Reply";

import avatar from "../../../assets/avatar.png";

export const Comment = ({ comments}) => {

  const [toggleReply, setToggleReply] = useState(false);
  const [toggleReplyState, setToggleReplyState] = useState(0);

  const toggleReplyStateHandler = (num) => {
    setToggleReplyState(num);
  };

  const handleToggleReply = (num) => {
    toggleReplyStateHandler(num);
    setToggleReply(true);
  };

  let bgStyle = {
    backgroundImage: `url(${avatar})`,
  };

  return comments.map((comment, index) => {
    const commentIdx = index;
    return (
      <div key={index}>
        {comment.text.length > 0 && (
          <>
            <div className=" flex py-6 border-t-2 border-gray-100">
              {/* <div
              className="h-16 w-16 bg-center bg-cover rounded-full mr-4 "
              style={bgStyle}
            ></div> */}
            <div className="h-16 w-16 bg-center bg-red-400 rounded-full mr-4 p-4">
                <h1 className="text-white text-base font-bold text-center ">
                {`${comment.name[0].toUpperCase()}  ${comment.name[1].toUpperCase()}`}
                </h1>
            </div>
              <div className="flex-1">
                <h3 className="mb-4 font-bold">{comment.name}</h3>
                <p className="text-sm mb-4">{comment.text}</p>
                <div className="mb-4">
                  <h5
                    onClick={() => handleToggleReply(index)}
                    className="text-sm text-blue-600 cursor-pointer"
                  >
                    Reply
                  </h5>
                </div>
              </div>
            </div>
            <div className=" w-3/5 ml-20 pl-4 mb-4">
              {comment.reply.map((reply, index) => {
                  return (
                    <Reply
                      key={index}
                      text={reply.text}
                      username={reply.name}
                      handleToggleReply={handleToggleReply}
                      num={commentIdx}
                    />
                  );
              })}
            </div>
          </>
        )}
        {
        toggleReply && toggleReplyState === index && (
          <CommentForm
            type={"reply"}
            lessonId={comment._id}
            placeholder={"Leave a reply..."}
            showForm={toggleReplyStateHandler}
            cancelText={true}
            togglShowForm={setToggleReply}
          />
        )}
      </div>
    );
  });
};
