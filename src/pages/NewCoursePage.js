import { CourseForm } from "../components/NewCourse/CourseForm";
import { SideNav } from "../components/UI/SideNav";

const NewCourse = () => {
  return (
      <div className="flex">
        <div className="w-80 border-r-2 border-gray-100">
          <SideNav />
        </div>
        <div className="main p-10 bg-gray-50 h-full">
          <CourseForm />
        </div>
      </div>
  );
};

export default NewCourse;
