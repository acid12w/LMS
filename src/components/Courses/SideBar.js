import { Lesson } from "./Lesson";
import { ProgressBar } from "./progressBar";

export const SideBar = (props) => {
  const courseLength = props.lessonsArr.length;
  const barWidth = 100 / courseLength;

  const { currentCourse } = props.userData;
  
  return ( 
    <div className="bg-gray-100 border-l-2 border-gray-200 right-0 w-1/4 ">
      <div className="w-full h-full p-6 text-left ">
        <h2 className="text-2xl mb-3">Masterclass: Phonies</h2>
        <h4 className="text-base mb-2">{`${currentCourse}/${courseLength} courses Completed`}</h4>
        <div className="mb-10 h-2 w-full flex">
          {props.lessonsArr.map((el, i) => {
            let courseNumber = i + 1;
            return (
              <ProgressBar
                width={barWidth}
                key={i}
                courseNumber={courseNumber}
                currentCourse={currentCourse}
              />
            );
          })}
        </div>
        {/* <ProgressBar /> */}
        {props.lessonsArr.map((el, i) => {
          let currentLesson = i + 1;
          return (
            <Lesson
              key={i}
              id={el._id}
              title={el.title}
              courseName={props.courseName}
              courseId={props.courseId}
              currentLesson={currentLesson}
              completedLessons={currentCourse}
              lessonId={props.lessonId}
              params={props.params}
              userLessonId={props.userData._id}
            />
          );
        })}
      </div>
    </div>
  );
};
