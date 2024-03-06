import { Link } from "react-router-dom";

import { FaSignOutAlt } from "react-icons/fa";

export const NotificationDropdown = ({ role }) => {
  return (
    <div className="bg-white shadow p-2 rounded-md w-48 absolute z-10 top-16 right-12 cursor-pointer">
      <ul>
        <li className="text-sm text-gray-500 p-2 w-full">
          No Notifications...
        </li>
      </ul>
    </div>
  );
};
