import { useParams } from "react-router-dom"; 

import { CousreFrom } from "./CourseForm";
import { LessonForm } from "./LessonForm";
import { PublishedFrom } from "./PublishedForm";

import { useUpdateCourseMutation } from "../../store/courseApiSlice";

export const MyCousreDetails = ({ myCourses }) => {
  const params = useParams();
  const [updateCourse] = useUpdateCourseMutation();
  const courseId = params.id;
  const currentCourse = myCourses?.find((course) => course._id === courseId);
  console.log(currentCourse)

  return (
    <div className="h-full">
      <CousreFrom myCourses={myCourses} isPublished={currentCourse.isPublished}/>
      <LessonForm courseId={courseId} />
      <PublishedFrom updateCourse ={updateCourse} courseId={courseId} isPublished={currentCourse.isPublished} lessons={currentCourse.lessons}/>
    </div>
  );
};
