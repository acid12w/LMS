import { NavLink } from "react-router-dom";

import { UilCreateDashboard } from "@iconscout/react-unicons";
import { UilUserSquare } from "@iconscout/react-unicons";
import { BiLogOut } from "react-icons/bi";
import { BiMessageAltDetail } from "react-icons/bi";

import useAuth  from "../../hooks/useAuth";

const activeNavStyle =
  "p-4 flex mx-4 cursor-pointer hover:bg-emerald-400 rounded-lg";

export const SideNav = ({ setToggleSideNav, toggleSideNav }) => {

  const { isInstructor } = useAuth();
 

  let content;

  content = <nav className="w-full  relative">
    <button type="button" onClick={() => setToggleSideNav(!toggleSideNav)} className="top-[-23px] left-[0] lg:hidden absolute right-[0] text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
        <svg  className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" ></path></svg>
        <span>Close menu</span>
    </button>
    <ul className="mt-10 flex flex-col gap-4">
      <li className="round-lg">
        <NavLink to="/profile" 
        className={(navData) =>
            navData.isActive
              ? `${activeNavStyle} ${"bg-emerald-500 rounded-lg text-emerald-900"}`
              : `${activeNavStyle} ${"text-gray-700"}`
          }>
          <UilUserSquare className="mr-2 text-2xl" />{" "}
          <span className="">Profile</span>
        </NavLink>
      </li>
      <li className=" ">
        { isInstructor && <NavLink
          to="/new-course"
          className={(navData) =>
            navData.isActive
              ? `${activeNavStyle} ${"bg-emerald-500 rounded-lg text-emerald-900"}`
              : `${activeNavStyle} ${"text-gray-700"}`
          }
        >
          <UilCreateDashboard className="mr-2 text-2xl" />{" "}
          <span className="">Create course</span>
        </NavLink>}
      </li>
      <li>
        {isInstructor && <NavLink to={`/my-course`}
        className={(navData) =>

          navData.isActive
            ? `${activeNavStyle} ${"bg-emerald-500 rounded-lg text-emerald-900"}`
            : `${activeNavStyle} ${"text-gray-700"}`
            
        }>
          <BiLogOut className="mr-2 text-2xl" />{" "}
          <span className="">Manage courses</span>
        </NavLink>}
      </li>
      <li className="">
        {isInstructor && <NavLink to={`/message`}
        className={(navData) =>

          navData.isActive
            ? `${activeNavStyle} ${"bg-emerald-500 rounded-lg text-emerald-900"}`
            : `${activeNavStyle} ${"text-gray-700 rounded-lg"}`
            
        }><BiMessageAltDetail className="mr-2 text-2xl"/>{" "}
          <span className="">Messages</span>
        </NavLink>}
      </li>
    </ul>
  </nav>
  
  return content;
};
