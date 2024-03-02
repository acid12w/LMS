import React from "react";
import { useSelector } from "react-redux";

import { MyCousre } from "../components/courseDashBoard/MyCousre";
import { SideNav } from "../components/UI/SideNav";

import { useGetCourseByInstructorQuery } from "../store/courseApiSlice";

const MyCoursePage = () => {

  
  const userId = useSelector((state) => state.auth.user.userId);
 
  const {data} = useGetCourseByInstructorQuery(userId); 


  if(!data){
    return <p>loading...</p>
  }

  return (
    <div className="flex">
        <div className="w-80 border-r-2 border-gray-100">
          <SideNav/>
        </div>
        <div className="main bg-gray-50 h-full">
          <div>
            <MyCousre myCourses={data} />
          </div>
        </div>
      </div>
    
  );
};

export default MyCoursePage;
