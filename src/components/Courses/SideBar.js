import { Lesson } from "./Lesson";
import { ProgressBar } from "./progressBar";

export const SideBar = (props) => {
  const courseLength = props.lessonsArr.length;
  const barWidth = 100 / courseLength;

  const currentCourse  = 1;
  const completedLessons = props?.userData?.completedLessons || 0;
  
  return ( 
    <div className={`border-gray-200 right-0 md:w-1/4 ${props.customStyle}`}>
      <div className="w-full h-full md:p-6 text-left ">
        <h4 className="text-base mb-2">{`${currentCourse}/${courseLength} courses Completed`}</h4>
        <div className="mb-10 h-2 w-full flex">
          {props.lessonsArr.map((el, i) => {
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
        {/* <ProgressBar /> */}
        {props.lessonsArr.map((el, i) => {
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
