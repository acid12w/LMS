import { useSelector, } from "react-redux";
import { useNavigate } from "react-router-dom";

// import Swiper core and required modules
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useGetMycourseQuery } from "../../store/userApiSlice";

const StartedCourses = () => {

 const userId = useSelector(
    (state) => state?.auth?.user?.userId
  );

const navigate = useNavigate();

const {data: startedCoursesData} = useGetMycourseQuery(userId);

  if(!startedCoursesData){
    return '';
  }

  return (
    <>
      {startedCoursesData.length > 0 ? (
        <div className=" py-8 mx-72">
          <h4 className="text-green-600 font-semibold ">Started Courses</h4> 
          <h2 className="font-bold text-gray-900 text-3xl">
            Continue learning
          </h2>
        </div>
      ) : (
        ""
      )}

      <div className="px-52">
        <Swiper
          // install Swiper modules
          spaceBetween={0}
          slidesPerView={2}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper "
        >
          {startedCoursesData?.map((courses, index) => {
            return (
              <SwiperSlide className="py-2 px-12" key={index}>
                <div key={courses.courseId} className="h-32 w-full flex shadow-md">
                  <div
                    onClick={() =>
                      navigate(
                        `/${courses.courseName}/${courses.courseId}/${courses.currentLessons}/overview`   
                      )
                    }
                    className="h-full w-2/5 bg-center bg-cover cursor-pointer"
                    style={{
                      backgroundImage: `url(${courses.thumbNail})`,
                    }}
                  ></div>

                  <div className=" p-4">
                     <h5 className="font-semibold text-gray-700">
                      {`Lecture ${courses.completedLessons} 0f 3`}
                    </h5> 
                    <h3 className="text-gray-900 font-bold text-base mb-4">
                      {courses.courseName}
                    </h3>
                    <h5 className="text-sm">{courses.name}</h5>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default StartedCourses;
