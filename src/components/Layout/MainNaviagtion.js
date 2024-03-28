import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { FiSearch } from "react-icons/fi";
import { RiNotification4Fill } from "react-icons/ri";
import { useSignoutMutation } from "../../store/authApiSlice";

import avatar from "../../assets/avatar.png";
import { DropDown } from "../UI/dropDown";
import { NotificationDropdown } from "../UI/NotificationDropdown"
import usePersist from "../../hooks/usePersist";
import useAuth from '../../hooks/useAuth';
import { useSelector } from "react-redux";

export const MainNaviagtion = () => {
  
  const [signout, {
    isSuccess,
  }] = useSignoutMutation();

  const user = useSelector(state => state?.auth?.user);

  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const [toggleNotification, setToggleNotification] = useState(false);

  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState();
  const [revealSearch, setRevealSearch] = useState(false);
  const [persist, setPersist] = usePersist();

  const {isInstructor, isStudent} = useAuth();
  const isAuth = isInstructor || isStudent;

 
  useEffect(() => {
    if (isSuccess) navigate('/')
  }, [isSuccess, navigate])

  const handleLogout = async () => {
    try{      
      await signout(); 
      setPersist(prev => !prev);
    }catch(error){
      console.error(error);
    }
  }; 
  
  const submitForm = (e) => {
    e.preventDefault();
    navigate({
      pathname: "/search",
      search: `?query=${searchValue}`,
    });
  };

  let bgStyle = {
    backgroundImage: `url(${user?.profileImage || avatar})`,
  };

  const homeLink = isAuth ? '/home' : '/'

  return (
     <nav className="flex items-center justify-between sticky px-2 py-2 bg-white drop-shadow-sm">
      <h3 className="font-bold w-[20%] text-green-600">
        <Link className="text-sm" to={homeLink}>G-LMS</Link>
      </h3>
      <div className="flex items-center justify-center p-2 bg-gray-100 rounded w-auto"  >
        <FiSearch className="text-gray-400 text-2xl mr-1 ml-1" />
        <form onSubmit={submitForm}>
          <input
            type="search" 
            placeholder="Search..."
            onChange={(e) => setSearchValue(e.target.value)}
            className="p-1 border-none outline-none bg-gray-100 bg-text-400 w-[90%]"
          />
        </form>
      </div>
      <ul className="flex items-center">
        {isAuth && (
          <li className="mr-3 p-2 ml-4 sm:p-4 bg-gray-100 rounded-full text-gray-600 hover:text-green-600 text-sm sm:text-xl"
          onClick={() => {
            setToggleNotification(!toggleNotification);
          }}>
            <RiNotification4Fill />
            {toggleNotification && <NotificationDropdown />}
          </li>
        )}
        { isAuth || (
          <li className="mr-1 p-4 text-gray-600 hover:text-green-600">
            <NavLink to="user/?query=login" className="font-bold">
              Login
            </NavLink>
          </li>
        )}
         {isAuth && (
          <li
            onClick={() => {
              setToggleMenu(!toggleMenu);
            }}
          >
            <div
              className="h-12 w-12 bg-center bg-cover rounded-full bg-green-400"
              style={bgStyle}
            ></div>
            {toggleMenu && <DropDown userName={user.currentUsername} handleLogout={handleLogout} role={isInstructor}/>}
          </li>
        )}
      </ul>
    </nav> 
  );
};
