import { NavLink } from "react-router-dom";
import { ImCheckboxChecked } from "react-icons/im";
import { ImCheckboxUnchecked } from "react-icons/im";
// import { useUpdateCourseMutation } from "../../store/courseApiSlice";
import { useUpdateUserCourseMutation } from "../../store/userApiSlice";

export const Lesson = ({
  title,
  courseName,
  courseId,
  currentLesson,
  completedLessons,
  params,
  userLessonId
}) => {

  const [updateUserCourse] = useUpdateUserCourseMutation();
  
  return (
    <NavLink
      onClick={() => updateUserCourse({payload: {currentCourse:currentLesson}, userLessonId })}
      to={`/course/${courseName
        .split(" ")
        .join("-")}/${title}/${courseId}/${params['*']}`}
      className={({ isActive }) =>
        isActive
          ? " flex hover:bg-gray-200 bg-gray-200 border-b-2 border-gray-300 "
          : "flex hover:bg-gray-200 border-b-2 border-gray-300 " 
      }
    >
      <div 
        className="flex items-center p-4"
      >
        {completedLessons >= currentLesson ? (
          <ImCheckboxChecked className="text-xl mr-2 fill-green-500" />
        ) : (
          <ImCheckboxUnchecked className="text-xl mr-2 fill-green-500" />
        )}
        <h4 className="text-lg text-green-800 ">{title}</h4>
      </div>
    </NavLink>
  );
};
