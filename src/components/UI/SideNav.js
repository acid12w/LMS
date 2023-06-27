import { Link, NavLink } from "react-router-dom";

import { BiHomeAlt } from "react-icons/bi";
import { UilCreateDashboard } from "@iconscout/react-unicons";
import { UilUserSquare } from "@iconscout/react-unicons";
import { BiSun } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";

const activeNavStyle =
  "p-4 flex mx-4 my-2 rounded-md cursor-pointer  hover:text-white hover:bg-green-500 ";

export const SideNav = () => {
  return (
    <nav className="w-75 h-full w-full fixed ">
      <ul className="mt-10 flex flex-col justify-center ">
        <li>
          <NavLink to="/profile" 
          className={(navData) =>
              navData.isActive
                ? `${activeNavStyle} ${"text-white bg-green-500 "}`
                : `${activeNavStyle} ${"text-gray-700"}`
            }>
            <UilUserSquare className="mr-2 text-2xl" />{" "}
            <span className="">Profile</span>
          </NavLink>
        </li>
        <li className=" ">
          <NavLink
            to="/new-course"
            className={(navData) =>
              navData.isActive
                ? `${activeNavStyle} ${"text-white bg-green-500 "}`
                : `${activeNavStyle} ${"text-gray-700"}`
            }
          >
            <UilCreateDashboard className="mr-2 text-2xl" />{" "}
            <span className="">Create course</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/my-course" 
          className={(navData) =>
            navData.isActive
              ? `${activeNavStyle} ${"text-white bg-green-500 "}`
              : `${activeNavStyle} ${"text-gray-700"}`
          }>
            <BiLogOut className="mr-2 text-2xl " />{" "}
            <span className="">Manage courses</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
