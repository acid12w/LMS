import { NavLink } from "react-router-dom";

export const CourseNav = () => {
  const activeNavStyle = "bg-orange-400 py-1 px-2 rounded text-white";
  return (
    <nav className="flex gap-5 md:gap-10 pb-3">
      <NavLink
        to="overview"
        className={(navData) => (navData.isActive ? activeNavStyle : "pb-2")}
      >
        Overview
      </NavLink>
      <NavLink
        to="res"
        className={(navData) => (navData.isActive ? activeNavStyle : "pb-2")}
      >
        Resource
      </NavLink>
      <NavLink
        to="discussion"
        className={(navData) => (navData.isActive ? activeNavStyle : "pb-2")}
      >
        Discusson
      </NavLink>
      <NavLink
        to="content"
        className={(navData) => (navData.isActive ? activeNavStyle : "pb-2 md:hidden")}
      >
        Content
      </NavLink>
    </nav>
  );
};
