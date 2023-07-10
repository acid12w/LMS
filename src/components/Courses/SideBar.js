import { Lesson } from "./Lesson";
import { ProgressBar } from "./progressBar";

export const SideBar = (props) => {
  const courseLength = props.lessonsArr.length;
  const barWidth = 100 / courseLength;

  const currentCourse  = 1;
  
  return ( 
    <div className="bg-gray-100 border-l-2 border-gray-200 right-0 w-1/4 ">
      <div className="w-full h-full p-6 text-left ">
        <h2 className="text-2xl mb-3">Masterclass: Phonies</h2>
        <h4 className="text-base mb-2">{`${currentCourse}/${courseLength} courses Completed`}</h4>
        <div className="mb-10 h-2 w-full flex">
          {props.lessonsArr.map((el, i) => {
            let courseNumber = i ;
            return (
              <ProgressBar
                width={barWidth}
                key={i}
                courseNumber={courseNumber}
                completedLessons={props.userData.completedLessons}
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
              completedLessons={props.userData.completedLessons}
              params={props.params}
              userLessonId={props.userData._id}
            />
          );
        })}
      </div>
    </div>
  );
};
