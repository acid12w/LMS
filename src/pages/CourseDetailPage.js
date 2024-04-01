import { useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Comments } from "../components/Courses/Comment/Comments";
import { Overview } from "../components/Courses/Overview";
import { Resources } from "../components/Courses/Resources";
import { SideBar } from "../components/Courses/SideBar";
import YoutubeEmbed from "../components/UI/YoutubeEmbeded";
import { CourseNav } from "../components/Courses/CourseNav";

import { GiRoundStar } from "react-icons/gi";
import { StarRaing } from "../components/UI/StarRaing";
import { useGetCourseByIdQuery } from "../store/courseApiSlice";
import { useGetMycourseQuery } from "../store/userApiSlice"; 

const parse = require("html-react-parser");

const CourseDetail = () => {

  const [showRating, setShowRating] = useState(true); 

  const params = useParams();
  const courseIdParam = params.id;

  const user = useSelector(
    (state) => state.auth.user
  );

 
  
  const userId = useSelector(
    (state) => state.auth.user.userId
  );
  
  const {data : userCourse} = useGetMycourseQuery(userId);
  const {data: courseData} = useGetCourseByIdQuery(courseIdParam);
  
  if (!courseData) {
    return < div className="w-screen h-screen flex justify-center items-center">
            <div role="status">
                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
        </div>;
  }

  if (!userCourse) {
    return < div className="w-screen h-screen flex justify-center items-center">
            <div role="status">
                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
        </div>;
  }

  
  
  const userCourseData = userCourse.find(course => course.courseId === courseIdParam);
 

  const {
    courseName,
    overview,
    subject,
    rating,
    rated,
    instructorId,
    _id: courseId,
  } = courseData;

  const lessonData = courseData?.lessons[userCourseData?.currentLessons || 0];
  
  const { resource, videoId, _id: lessonId } = lessonData;  

  return (
    <>
      {showRating &&
        (rated < 0 ? (
          ""
        ) : (
          <StarRaing courseId={courseId} setShowRating={setShowRating} />
        ))}
      <div className="flex">
        <div className="w-full md:w-9/12">
          <div className="flex justify-between py-4 px-8">
            <h1 className="text-3xl font-bold">{courseName}:</h1>
          </div>
          <div className="flex items-center py-4 px-8">
            <h3 className="p-2 mr-20 bg-red-300 text-red-600 rounded">
              {subject}
            </h3>{" "}
            <div className="flex  mr-3">
              {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                  <GiRoundStar
                    key={ratingValue}
                    className={`text-2xl ${
                      ratingValue <= rating
                        ? "text-yellow-500"
                        : "fill-gray-400"
                    }`}
                  />
                );
              })}
            </div>
            <h3>{rating.toFixed(1)}</h3>
          </div>
          <YoutubeEmbed embedId={videoId} width={100} height={680}/>
          <div className="p-4">
            <CourseNav />
            <div className="py-12">
              <Routes>
                <Route
                  path="overview"
                  element={
                    <Overview
                      overview={overview}
                      instructorId={instructorId}
                    />
                  }
                />
                <Route
                  path="res"
                  element={
                    <Resources
                      resourse={<Resources resourse={parse(resource)} />}
                    />
                  }
                />
                <Route
                  path="discussion"
                  element={
                    <Comments
                      lessonId={lessonId}
                    />
                  }
                />
                <Route
                  path="content"
                  element={
                    <SideBar
                      courseId={courseId}
                      params={params}
                      lessonsArr={courseData.lessons}
                      userData={userCourseData}
                      courseName={courseName}
                      customStyle={'md:hidden'}
                    />
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
        <SideBar
          courseId={courseId}
          params={params}
          lessonsArr={courseData.lessons}
          userData={userCourseData}
          courseName={courseName}
          customStyle={'hidden md:block'}
        />
      </div>
    </>
  );
};

export default CourseDetail;
