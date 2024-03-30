import { useState } from "react";
import { CourseForm } from "../components/NewCourse/CourseForm";
import { SideNav } from "../components/UI/SideNav";

const NewCourse = () => {
  const [toggleSideNav, setToggleSideNav] = useState(false);

  return (
      <div className="flex">
        <button onClick={() => setToggleSideNav(!toggleSideNav)} type="button" class="absolute  inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>
        <div className={`w-80 border-r-2 border-gray-100  fixed z-30 bg-white h-full ${toggleSideNav ? 'translate-x-[0]' : 'translate-x-[-100%]'}`}>
        <SideNav setToggleSideNav={setToggleSideNav} toggleSideNav={toggleSideNav}/>
        </div>
        <div className="w-full md:main p-10 bg-gray-50 h-full">
          <CourseForm />
        </div>
      </div>
  );
};

export default NewCourse;
