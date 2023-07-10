import { NavLink } from "react-router-dom";
import { ImCheckboxChecked } from "react-icons/im";
import { ImCheckboxUnchecked } from "react-icons/im";
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

  const activeNav =  index === Number(params.lesson)
     ? " flex hover:bg-gray-200 bg-gray-200 border-b-2 border-gray-300"
     : "flex hover:bg-gray-200 border-b-2 border-gray-300 ";


  const count = () => {
    let completed = completedLessons;
    if(currentLessons > completed) {
      completed = currentLessons;
    }
    return completed
  }
  
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
          <ImCheckboxChecked className="text-xl mr-2 fill-green-500" />
        ) : (
          <ImCheckboxUnchecked className="text-xl mr-2 fill-green-500" />
        )}
        <h4 className="text-lg text-green-800 ">{title}</h4>
      </div>
    </NavLink>
  );
};
