import { Link } from "react-router-dom";

import { FaSignOutAlt } from "react-icons/fa";

export const DropDown = ({ userName, handleLogout, role }) => {
  return (
    <div className="bg-white shadow p-2 rounded-md h-30 w-48 absolute z-20 top-16 right-12 cursor-pointer">
      <ul>
          <li className="text-sm text-gray-500 p-2 w-full">
            {userName}
          </li>
        <Link to="/profile">
          <li className="text-sm hover:bg-gray-100 rounded-md text-gray-500 p-2 w-full">
            Profile
          </li>
        </Link>
        {role || <Link to="/my-courses"> 
          <li className="rounded-md text-sm hover:bg-gray-100 text-gray-500 p-2 w-full">
            Dash board
          </li>
        </Link>}
        {/* <li className="text-sm border-t border-gray-200 hover:bg-green-200 text-green-500 p-2 w-full">
          <Link to="/new-course">create course</Link>
        </li>  */}
        <li
          onClick={handleLogout}
          className="rounded-md text-sm border-gray-200 hover:bg-gray-100 text-gray-500 p-2 flex items-center"
        >
          <h4 className="mr-4">Sign out</h4><FaSignOutAlt/>
        </li>
      </ul>
    </div>
  );
};
