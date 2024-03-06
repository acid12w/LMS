import { useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { MyCousreDetails } from "./MycourseDetails";

export const MyCousre = ({ myCourses }) => {


  if (myCourses.length <= 0) {
    return <div>No courses found...</div>;
  }

  return (
    <div className="h-full">
      
      <Routes>
        <Route path=":id" element={<MyCousreDetails myCourses={myCourses} />} />
      </Routes>
    </div>
  );
};
