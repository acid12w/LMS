import React from "react";

export const ProgressBar = (props) => {

  
  return (
    <div
      className={`h-full  mr-1 rounded-full ${
        props.courseNumber <= props.completedLessons
          ? "bg-green-600"
          : "bg-green-400"
      }`}
      style={{
        width: `${props.width}%`,
      }}
    ></div>
  );
};
