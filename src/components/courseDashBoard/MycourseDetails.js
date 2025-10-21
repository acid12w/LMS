import { useParams } from "react-router-dom"; 

import { CousreFrom } from "./CourseForm";
import { LessonForm } from "../../pages/LessonForm";
import { PublishedFrom } from "./PublishedForm";

import { useUpdateCourseMutation } from "../../store/courseApiSlice";
import { useGetLessonByCourseIdQuery  } from "../../store/lessonApiSlice";

export const MyCousreDetails = ({ myCourses }) => {
  const params = useParams();
  const [updateCourse] = useUpdateCourseMutation();
  const courseId = params.id;
  const currentCourse = myCourses?.find((course) => course._id === courseId);
  const {data: lessons} = useGetLessonByCourseIdQuery(courseId); 
 

  return (
    <div className="h-full">
      <CousreFrom myCourses={myCourses} isPublished={currentCourse.isPublished}/>
      <PublishedFrom updateCourse ={updateCourse} courseId={courseId} currentCourse={currentCourse} lessons={lessons}/>
    </div>
  );
};

