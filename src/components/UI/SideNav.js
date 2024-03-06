import { NavLink } from "react-router-dom";


import { UilCreateDashboard } from "@iconscout/react-unicons";
import { UilUserSquare } from "@iconscout/react-unicons";
import { BiLogOut } from "react-icons/bi";
import { MutatingDots } from 'react-loader-spinner';

import { useGetCourseByInstructorQuery } from "../../store/courseApiSlice";
import { useSelector } from "react-redux";
import useAuth  from "../../hooks/useAuth";

const activeNavStyle =
  "p-4 flex mx-4  cursor-pointer  hover:bg-gray-100 ";

export const SideNav = () => {

  const { isInstructor } = useAuth();
 

  const userId = useSelector((state) => state.auth.user.userId);
  const {data} = useGetCourseByInstructorQuery(userId); 

  let content;

  if(!data) {
    content = <MutatingDots
              visible={true}
              height="100"
              width="100"
              color="#4fa94d"
              secondaryColor="#4fa94d"
              radius="12.5"
              ariaLabel="mutating-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
              />
  }else{
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
  }

  return content;
};
