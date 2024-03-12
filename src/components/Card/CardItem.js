import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { BiBriefcaseAlt2 } from "react-icons/bi";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { BsFillStarFill } from "react-icons/bs";

import classes from "./CardItem.module.css";
// import { Favorite } from "../UI/Favorite";

import { useGetMycourseQuery, useAddUserCourseMutation } from "../../store/userApiSlice";
import  useAuth  from '../../hooks/useAuth';


const CardItem = ({
  thumbNail,
  courseName,
  difficulty,
  participants,
  imageFull,
  rating,
  lessons,
  courseId,
  subject
}) => {  

  const [addUserCourse] = useAddUserCourseMutation();
  const { isStudent } = useAuth();
  
  const navigate = useNavigate();
  
  const user = useSelector((state) => state?.auth?.user);

  const {data: userCourses} = useGetMycourseQuery(user?.userId);

  const userCourseData = userCourses ? userCourses?.find(course => course.courseId === courseId) : undefined;
  
  let currentLessons = userCourseData !== undefined ? userCourseData.currentLessons : 0;

  const cardInfoClass = imageFull
    ? `${classes.cardInfoBox}`
    : `${classes.cardInfoBox} ${classes.backgroundWhite}`;

  const bgClass = imageFull ? `${thumbNail}` : "";

  const textWhite = imageFull ? "text-white" : "";

  const bgColor = imageFull ? "" : "bg-gray-100";

  let str = courseName;
  const newCourseName = str.split(" ").join("-");

  const courseSliceObj = {
    thumbNail,
    totalLessons: lessons.length,
    currentLessons : 0,
    completedLessons: 0,
    courseName,
    courseId 
  };

  const addStatredCourse = async () => {
    if (!isStudent) return;
    addUserCourse({currentUsername: user.currentUsername, course: courseSliceObj})
  };

  const navTo = () => {
    let navUrl = isStudent
      ? `/${newCourseName}/${courseId}/${currentLessons}/overview` 
      : `/course-overview/${courseId}`;
    navigate(navUrl, {
      replace: true,
    });
  };



  return (
    <>
      <div
      onClick={addStatredCourse}
        className="w-72 bg-white flex flex-col justify-center rounded-md relative overflow-hidden shadow-md bg-center bg-cover custom-h-84 cursor-pointer"
        style={{
          backgroundImage: `url(${bgClass})`,
        }}
      >
        <div className="absolute opacity-60 top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900"></div>
        <div
          onClick={() => {
            navTo();
          }}
          className={classes.cardImageHolder}
        >
          {!imageFull && (
            <img
              src={thumbNail}
              alt="study"
              className="z-10 cursor-pointer w-full"
            />
          )}
        </div>
        <div className={cardInfoClass}> 
            <h3 className={`p-2 mr-20 ${bgColor} text-xs text-green-600 rounded`}>
              {subject}
            </h3>
          <div
            onClick={() => {
              navTo();
            }}
          >
            <h3 className={`${textWhite} text-sm font-semibold cursor-pointer`}>
              {courseName}
            </h3>
          </div>

          <div className={classes.cardInfo}>
            <div className={classes.cardFooter}>
              <span>
                <BiBriefcaseAlt2 />{" "}
              </span>
              <h4 className={`${textWhite} text-sm`}>{difficulty}</h4>
            </div>
            <div className={classes.cardFooter}>
              <span>
                <MdOutlinePeopleAlt />{" "}
              </span>
              <h4 className={`${textWhite} text-sm`}>{participants}</h4>
            </div>
            <div className={classes.cardFooter}>
              <span>
                <BsFillStarFill className={classes.rating} />{" "}
              </span>
              <h4 className={`${textWhite} text-sm`}>{rating.toFixed(1)}</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardItem;
