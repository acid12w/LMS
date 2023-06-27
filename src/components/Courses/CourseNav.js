import { NavLink } from "react-router-dom";

export const CourseNav = () => {
  const activeNavStyle = "border-b-4 border-green-500 pb-2 text-green-800";
  return (
    <nav className="flex gap-10 pb-3">
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
    </nav>
  );
};
