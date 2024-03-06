import React from "react";
import { useSelector } from "react-redux";
import { useNavigate,useParams } from "react-router-dom";

import { MyCousre } from "../components/courseDashBoard/MyCousre";
import { SideNav } from "../components/UI/SideNav";

import { useGetCourseByInstructorQuery } from "../store/courseApiSlice";

const MyCoursePage = () => {

  const courseId = useParams()["*"];
  const userId = useSelector((state) => state.auth.user.userId);
 
  const {data} = useGetCourseByInstructorQuery(userId); 

  const navigate = useNavigate(); 
  
  if(!data){
    return <p>loading...</p>
  }

  const navTo = (id) => {
    navigate(`/my-course/${id}`, {
      replace: true,
    });
  };

  const currentCourse = data?.find((course) => course._id === courseId);
  // console.log(data, currentCourse, courseId)


  return (
    <div className="flex">
        <div className="w-80 border-r-2 border-gray-100">
          <SideNav/>
        </div>
        <div className="main p-10 bg-gray-50 h-full">
          <div>
            <h2 className="text-center text-lg font-bold mb-4">My Courses</h2>
            <div className="flex justify-center mb-20">
              {data.map((course, index) => {
                return (
                  <div
                    className="p-4 bg-gray-100 mr-4 cursor-pointer"
                    key={index}
                    onClick={() => {
                      navTo(course._id);
                    }}
                  >
                    <h3 className="mb-2">{course.courseName}</h3>
                    <div className="flex">
                      <div
                        onClick={() => {
                          // dispatch(removedMycourse(course._id));
                        }}
                        className="mr-2 flex items-center  mr-4 cursor-pointer hover:text-rose-500"
                      >
                        {/* <TiDocumentDelete /> <h4 className="ml-1 text-sm ">Delete</h4> */}
                      </div>
                      {/* <span className="mr-2 flex items-center cursor-pointer hover:text-rose-500">
                        <FiEye /> <h4 className="ml-1 text-sm">Preview</h4>
                      </span> */}
                    </div>
                  </div>
                );
              })}
            </div>
           {currentCourse === undefined ? <p className="h-96">Select a course to begin...</p> : <MyCousre myCourses={data} /> }
          </div>
        </div>
      </div>
    
  );
};

export default MyCoursePage;
