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

  return (
    <>
    <nav className="bg-white border-gray-200">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <Link className="font-bold p-4 text-green-600" to="/">G-LMS</Link>
  <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
  {isAuth && (
          <div
            className="mr-4 " 
            onClick={() => {
              setToggleMenu(!toggleMenu);
            }}
          >
            <div
              className="h-12 w-12 bg-center bg-cover rounded-full mr-4 bg-green-400"
              style={bgStyle}
            ></div>
            {toggleMenu && <DropDown userName={user.currentUsername} handleLogout={handleLogout} role={isInstructor}/>}
          </div>
        )}
      <button onClick={() => setToggleDropDown(!toggleDropDown)} data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="navbar-user" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden={toggleDropDown} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
  <div className={`items-center justify-between ${toggleDropDown ? 'visible' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-user">
    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
   <li className=""> 
   <div className="flex items-center justify-center p-2 bg-gray-100 rounded">
        <FiSearch className="text-gray-400 text-lg mr-1 ml-1" />
        <form onSubmit={submitForm}>
          <input
            type="search" 
            placeholder="Search..."
            onChange={(e) => setSearchValue(e.target.value)}
            className="p-1 border-none outline-none bg-gray-100 bg-text-400"
          />
        </form>
      </div>
    </li>
 
      {isAuth && (
        <li className="mr-1 p-4 text-gray-600 hover:text-green-600">
          <NavLink to="/home" className="font-bold">
            Home
          </NavLink>
        </li>)}
        {/* {isAuth && (
          <li className="mr-3 p-4 bg-gray-100 rounded-full text-gray-600 hover:text-green-600 text-xl"
          onClick={() => {
            setToggleNotification(!toggleNotification);
          }}>
            <RiNotification4Fill />
            {toggleNotification && <NotificationDropdown />}
          </li>
        )} */}
        { isAuth || (
          <li className="mr-1 p-4 text-gray-600 hover:text-green-600">
            <NavLink to="user/?query=login" className="font-bold">
              Login
            </NavLink>
          </li>
        )}
    </ul>
  </div>
  </div>
</nav>
    {/* <nav className="flex items-center justify-between sticky  px-8 py-2 bg-white drop-shadow-sm">
      <h3 className="font-bold p-4 text-green-600">
        <Link to="/">G-LMS</Link>
      </h3>
      <div className="flex items-center justify-center p-2 bg-gray-100 rounded">
        <FiSearch className="text-gray-400 text-lg mr-1 ml-1" />
        <form onSubmit={submitForm}>
          <input
            type="search" 
            placeholder="Search..."
            onChange={(e) => setSearchValue(e.target.value)}
            className="p-1 border-none outline-none bg-gray-100 bg-text-400"
          />
        </form>
      </div>
      <ul className="flex items-center">
      {isAuth && (
        <li className="mr-1 p-4 text-gray-600 hover:text-green-600">
          <NavLink to="/home" className="font-bold">
            Home
          </NavLink>
        </li>)}
        {isAuth && (
          <li className="mr-3 p-4 bg-gray-100 rounded-full text-gray-600 hover:text-green-600 text-xl"
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
            className="mr-4 "
            onClick={() => {
              setToggleMenu(!toggleMenu);
            }}
          >
            <div
              className="h-12 w-12 bg-center bg-cover rounded-full mr-4 bg-green-400"
              style={bgStyle}
            ></div>
            {toggleMenu && <DropDown userName={user.currentUsername} handleLogout={handleLogout} role={isInstructor}/>}
          </li>
        )}
      </ul>
    </nav> */}

    </>
  );
};
