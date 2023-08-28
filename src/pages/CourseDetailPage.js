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
  
  const userId = useSelector(
    (state) => state.auth.user.userId
  );
  
  const {data : userCourse} = useGetMycourseQuery(userId);
  const {data: courseData} = useGetCourseByIdQuery(courseIdParam);
  
  if (!courseData) {
    return <p>...</p>;
  }

  if (!userCourse) {
    return <p>...</p>;
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
        <div className="w-9/12">
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
          <YoutubeEmbed embedId={videoId} />
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
                      comments={lessonData.comments}
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
        />
      </div>
    </>
  );
};

export default CourseDetail;
