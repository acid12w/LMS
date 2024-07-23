import { NavLink } from "react-router-dom";
// import { ImCheckboxChecked } from "react-icons/im";
// import { ImCheckboxUnchecked } from "react-icons/im";
import { FaCheckCircle } from "react-icons/fa";
import { useUpdateUserCourseMutation } from "../../store/userApiSlice";

export const Lesson = ({
  title,
  courseName,
  courseId,
  currentLessons,
  completedLessons,
  params,
  userLessonId,
  index
}) => {
  
  const [updateUserCourse] = useUpdateUserCourseMutation();

  const count = () => {
    let completed = completedLessons;
    if(currentLessons > completed) {
      completed = currentLessons;
    }
    return completed
  }

  const lessonCompleted = currentLessons >= completedLessons ? true : false;

  const bgStyle = lessonCompleted ? 'bg-gray-200' : 'bg-green-200';

  const activeNav =  index === Number(params.lesson)
  ? " flex hover:bg-green-600 bg-green-500 mb-4 rounded "
  : `flex hover:bg-green-600 ${bgStyle} mb-4 rounded`;

  
  return (
    <NavLink
      onClick={() => updateUserCourse({payload: {currentLessons: index, completedLessons: count()}, userLessonId })}
      to={`/${courseName}/${courseId}/${currentLessons}/${params['*']}`}
      className={activeNav}
    >
      <div 
        className="flex items-center p-4"
      >
        {completedLessons >= currentLessons ? (
          <FaCheckCircle className="text-xl mr-2 fill-green-800" />
        ) : (
          <FaCheckCircle className="text-xl mr-2 fill-gray-700" />
        )}
        <h4 className={`text-base ${lessonCompleted ? "text-gray-900" : "text-green-900"  }`}>{title}</h4> 
      </div>
    </NavLink>
  );
};
