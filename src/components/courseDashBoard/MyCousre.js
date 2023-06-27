import { useNavigate, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MyCousreDetails } from "./MycourseDetails";

import { RiEditBoxLine } from "react-icons/ri";
import { TiDocumentDelete } from "react-icons/ti";

// import { Roller } from "react-awesome-spinners";


import { FiEye } from "react-icons/fi";


export const MyCousre = ({ myCourses }) => {
  const navigate = useNavigate();

  const navTo = (id) => {
    navigate(`/my-course/${id}`);
  };

  if (myCourses.length <= 0) {

    return <div>No courses found...</div>;

  }

  return (
    <div className="h-full p-8">
      <h2 className="text-center text-lg font-bold mb-4">My Courses</h2>
      <div className="flex justify-center mb-4">
        {myCourses.map((course, index) => {
          return (
            <div
              className="p-4 bg-gray-100 mr-4"
              key={index}
              onClick={() => {
                navTo(course._id);
              }}
            >
              <h3 className="mb-2">{course.courseName}</h3>
              <div className="flex">
                <div
                  onClick={() => {
                    // dispatch(removedMycourse(course._id));
                  }}
                  className="mr-2 flex items-center  mr-4 cursor-pointer hover:text-rose-500"
                >
                  <TiDocumentDelete /> <h4 className="ml-1 text-sm ">Delete</h4>
                </div>
                <span className="mr-2 flex items-center cursor-pointer hover:text-rose-500">
                  <FiEye /> <h4 className="ml-1 text-sm">Preview</h4>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <Routes>
        <Route path=":id" element={<MyCousreDetails myCourses={myCourses} />} />
      </Routes>
    </div>
  );
};
