import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// import Swiper core and required modules
import { Navigation, Pagination } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import { useGetCourseByIdQuery } from "../../store/courseApiSlice";

const StartedCourses = () => {

  const navigate = useNavigate();

  const user = useSelector(
    (state) => state.auth.user
  );

  const startedCoursesData = useSelector(
    (state) => state.auth?.user?.myCourses
  );


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
          {startedCoursesData.map((courses, index) => {
            return (
              <SwiperSlide className="py-2 px-12" key={index}>
                <div key={courses.ID} className="h-32 w-full flex shadow-md">
                  <div
                    onClick={() =>
                      navigate(
                        `/course/${courses.courseName}/${courses.lessons[0].title}/${courses.courseId}/overview`
                      )
                    }
                    className="h-full w-2/5 bg-center bg-cover cursor-pointer"
                    style={{
                      backgroundImage: `url(${courses.thumbNail})`,
                    }}
                  ></div>

                  <div className=" p-4">
                    {/* <h5 className="font-semibold text-gray-700">
                      {`Lecture ${completedLesson} 0f ${totalLessons}`}
                    </h5> */} 
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
