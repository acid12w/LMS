import { useState } from "react";

export const Pagination = ({ PerPagecourses, totalCourses, onPaginate }) => {
  const [toggle, setToggle] = useState(1);
  const toggleState = (num) => {
    setToggle(num);
  };

  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalCourses / PerPagecourses); i++) {
    pageNumber.push(i);
  }

  const handleNav = (num) => {
    toggleState(num);
    onPaginate(num);
  };

  return (
    <nav className=" w-full flex justify-center items-center py-4">
      <ul className="flex cursor-pointer">
        {pageNumber.map((number) => {
          return (
            <li
              className={
                toggle === number
                  ? "px-4 py-2  mr-1 bg-emerald-500 text-white rounded-md"
                  : "px-4 py-2  mr-1 border-gray-200 bg-white border-2 rounded-md"
              }
              key={number}
              onClick={() => handleNav(number)}
            >
              <a href="#!">{number}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
