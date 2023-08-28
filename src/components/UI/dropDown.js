import { Link } from "react-router-dom";

import { FaSignOutAlt } from "react-icons/fa";

export const DropDown = ({ handleLogout, role }) => {
  return (
    <div className="bg-gray-100 h-36 w-48 absolute z-10 top-16 right-12 cursor-pointer">
      <ul>
        <li className="text-sm hover:bg-green-200 text-green-800 p-2 w-full">
          <Link to="/profile">profile</Link>
        </li>
        {!role || <li className="text-sm hover:bg-green-200 text-green-800 p-2 w-full">
          <Link to="/my-course">Dash board</Link>
        </li>}
        {/* <li className="text-sm border-t border-gray-200 hover:bg-green-200 text-green-800 p-2 w-full">
          <Link to="/new-course">create course</Link>
        </li>  */}
        <li
          onClick={handleLogout}
          className="text-sm border-t border-gray-200 hover:bg-green-200 text-green-800 p-2 flex item-center"
        >
          <h4 className="mr-4">sign out</h4><FaSignOutAlt/>
        </li>
      </ul>
    </div>
  );
};
