import { Lesson } from "./Lesson";
import { ProgressBar } from "./progressBar";


export const SideBar = (props) => {
  const courseLength = props.lessonsArr.length;
  const lessons = props.lessonsArr.filter(lesson => lesson.isPublished === true);
  const barWidth = 100 / courseLength;

  
  const currentCourse  = 1;
  const completedLessons = props?.userData?.completedLessons || 0;
  return ( 
    <div className={`border-gray-200 right-0 md:w-1/4 md:p-2 ${props.customStyle}`}>
      <div className="w-fulls md:p-2 text-left ">
        <h3 className="text-xl text-bold">Lessons</h3>
        <h4 className="text-sm text-gray-500 mb-14">{`${currentCourse}/${courseLength} lessons Completed`}</h4>
        <div className="mb-10 h-2 w-full flex">
          {lessons.map((el, i) => {
            let courseNumber = i ;
            return (
              <ProgressBar
                width={barWidth}
                key={i}
                courseNumber={courseNumber}
                completedLessons={completedLessons}
              />
            );
          })}
        </div>
        <ProgressBar />
        {lessons.map((el, i) => {
          let currentLesson = i;
          return (
            <Lesson
              key={i}
              title={el.title}
              index={currentLesson}
              courseName={props.courseName}
              courseId={props.courseId}
              currentLessons={currentLesson}
              completedLessons={completedLessons}
              params={props.params}
              userLessonId={props?.userData?._id}
            />
          );
        })}
      </div>
    </div>
  );
};
