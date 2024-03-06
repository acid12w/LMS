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
     ? " flex hover:bg-green-600 bg-green-600 mb-0-1 rounded "
     : "flex hover:bg-green-600 bg-green-400 mb-0-1 rounded";


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
          <ImCheckboxChecked className="text-xl mr-2 fill-green-800" />
        ) : (
          <ImCheckboxUnchecked className="text-xl mr-2 fill-green-800" />
        )}
        <h4 className="text-lg text-green-900">{title}</h4>
      </div>
    </NavLink>
  );
};
