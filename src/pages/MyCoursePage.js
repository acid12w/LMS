import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate,useParams } from "react-router-dom";

import { MyCousre } from "../components/courseDashBoard/MyCousre";
import { SideNav } from "../components/UI/SideNav";

import { GrTechnology } from "react-icons/gr";

import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


import { useGetCourseByInstructorQuery } from "../store/courseApiSlice";

const MyCoursePage = () => {

  const courseId = useParams()["*"];
  const userId = useSelector((state) => state.auth.user.userId);

  const [tabCount, setTabCount] = useState(null);
 
  const {data} = useGetCourseByInstructorQuery(userId); 

  const navigate = useNavigate(); 
  
  if(!data){
    return < div className="w-screen h-screen flex justify-center items-center">
    <div role="status">
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
    </div>
</div>
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
        <div className="main p-10 pt-20 bg-gray-50 h-full">
          <div>
            <h2 className="text-center text-lg font-bold mb-12">My Courses</h2>
            <Swiper
              // install Swiper modules
              spaceBetween={10}
              slidesPerView={4}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper px-16 mb-20 "
            >
              {data.map((course, index) => {
                return (
                  <SwiperSlide className="" key={index}>
                  <div
                    className={`p-4 bg-white shadow-md mr-4 cursor-pointer flex items-center rounded-md ${tabCount === index ? 'bg-green-200' : ''}`}
                    key={index}
                    onClick={() => {
                      navTo(course._id);
                      setTabCount(index)
                    }}
                  >
                    <div className="text-3xl p-2 bg-green-400 mr-2 rounded-md"><GrTechnology className="fill-green-800"/></div> 
                    <div>
                    <h3 className="text-sm text-gray-800">{course.courseName}</h3>
                    <h3 className='text-xs text-gray-600'rounded>{course.subject}</h3>
                    </div>
                
                  </div>
                  </SwiperSlide>
                );
              })}
              </Swiper>
            
           {currentCourse === undefined ? <p className="h-96">Select a course to begin...</p> : <MyCousre myCourses={data} /> }
          </div>
        </div>
      </div>
    
  );
};

export default MyCoursePage;
