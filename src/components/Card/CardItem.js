import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { BiBriefcaseAlt2 } from "react-icons/bi";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { BsFillStarFill } from "react-icons/bs";

import classes from "./CardItem.module.css";
// import { Favorite } from "../UI/Favorite";

import { useGetMycourseQuery, useAddUserCourseMutation } from "../../store/userApiSlice";


const CardItem = ({
  thumbNail,
  courseName,
  difficulty,
  participants,
  imageFull,
  rating,
  lessons,
  courseId,
}) => {  

  const [addUserCourse] = useAddUserCourseMutation();
  
  const navigate = useNavigate();
  
  const user = useSelector((state) => state?.auth?.user);

  const isLoggedin = user?.currentUsername ? true : false;

  const {data: userCourses} = useGetMycourseQuery(user?.userId);

  let userCourseData = {};
  userCourseData.currentLessons = 0;  

  if(userCourses){
    userCourseData = userCourses.find(course => course.courseId === courseId);
  }

  const cardInfoClass = imageFull
    ? `${classes.cardInfoBox} ${classes.backgroundWhite}`
    : `${classes.cardInfoBox}`;

  const bgClass = !imageFull ? `${thumbNail}` : "";

  const textWhite = !imageFull ? "text-white" : "";

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
    if (!isLoggedin) return;
    addUserCourse({currentUsername: user.currentUsername, course: courseSliceObj})
  };

  const navTo = () => {
    let navUrl = isLoggedin
      ? `/${newCourseName}/${courseId}/${userCourseData.currentLessons}/overview` 
      : `/course-overview/${courseId}`;
    navigate(navUrl, {
      replace: true,
    });
  };



  return (
    <>
      <div
      onClick={addStatredCourse}
        className="w-72 bg-white flex flex-col justify-center rounded-xl relative overflow-hidden shadow-md bg-center bg-cover custom-h-84"
        style={{
          backgroundImage: `url(${bgClass})`,
        }}
      >
        <div className="absolute opacity-60 top-0  right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900"></div>

        <div
          onClick={() => {
            navTo();
          }}
          className={classes.cardImageHolder}
        >
          {imageFull && (
            <img
              src={thumbNail}
              alt="study"
              className="z-10 cursor-pointer w-full"
            />
          )}
        </div>
        <div className={cardInfoClass}>
          <div
            onClick={() => {
              navTo();
            }}
          >
            <h3
              className={`${textWhite} text-base font-semibold cursor-pointer`}
            >
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
        {/* <Favorite addStatredCourse={addStatredCourse} /> */}
      </div>
    </>
  );
};

export default CardItem;
