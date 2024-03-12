import { NavLink } from "react-router-dom";

import { UilCreateDashboard } from "@iconscout/react-unicons";
import { UilUserSquare } from "@iconscout/react-unicons";
import { BiLogOut } from "react-icons/bi";
import useAuth  from "../../hooks/useAuth";

const activeNavStyle =
  "p-4 flex mx-4  cursor-pointer  hover:bg-gray-100 ";

export const SideNav = () => {

  const { isInstructor } = useAuth();
 

  let content;

  content = <nav className="w-75 h-full w-full">
    <ul className="mt-10 flex flex-col justify-center ">
      <li>
        <NavLink to="/profile" 
        className={(navData) =>
            navData.isActive
              ? `${activeNavStyle} ${" bg-gray-100 "}`
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
              ? `${activeNavStyle} ${" bg-gray-100 "}`
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
            ? `${activeNavStyle} ${"bg-gray-100 "}`
            : `${activeNavStyle} ${"text-gray-700"}`
            
        }>
          <BiLogOut className="mr-2 text-2xl" />{" "}
          <span className="">Manage courses</span>
        </NavLink>}
      </li>
    </ul>
  </nav>
  
  return content;
};
