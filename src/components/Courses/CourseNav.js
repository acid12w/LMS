import { NavLink } from "react-router-dom";

export const CourseNav = () => {
  const activeNavStyle = "bg-blue-100 py-1 px-2 rounded text-blue-500 border border-blue-500 ";
  return (
    <nav className="flex gap-5 md:gap-10 pb-3">
      <NavLink
        to="overview"
        className={(navData) => (navData.isActive ? activeNavStyle : "py-1 px-2")}
      >
        Overview
      </NavLink>
      <NavLink
        to="res"
        className={(navData) => (navData.isActive ? activeNavStyle : "py-1 px-2")}
      >
        Resource
      </NavLink>
      {/* <NavLink
        to="discussion"
        className={(navData) => (navData.isActive ? activeNavStyle : "py-1 px-2")}
      >
        Discusson
      </NavLink> */}
      <NavLink
        to="content"
        className={(navData) => (navData.isActive ? activeNavStyle : " md:hidden py-1 px-2")}
      >
        Content
      </NavLink>
    </nav>
  );
};
