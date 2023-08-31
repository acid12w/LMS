import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { FiSearch } from "react-icons/fi";
import { RiNotification2Line } from "react-icons/ri";
import { useSignoutMutation } from "../../store/authApiSlice";

import avatar from "../../assets/avatar.png";
import { DropDown } from "../UI/dropDown";
import usePersist from "../../hooks/usePersist";
import useAuth from '../../hooks/useAuth';

export const MainNaviagtion = () => {
  
  const [signout, {
    isSuccess,
  }] = useSignoutMutation();

  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState();
  const [persist, setPersist] = usePersist();

  const {isInstructor, isStudent} = useAuth();
 
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
    backgroundImage: `url(${avatar})`,
  };

  return (
    <nav className="flex items-center justify-between px-8 py-2 bg-custom">
      <h3 className="font-bold p-4 text-green-400">
        <Link to="/">G-LMS</Link>
      </h3>
      <div className="flex items-center justify-center">
        <FiSearch className="text-white text-lg" />
        <form onSubmit={submitForm}>
          <input
            type="search"
            placeholder="Search..."
            onChange={(e) => setSearchValue(e.target.value)}
            className="p-3 border-none outline-none bg-custom text-white"
          />
        </form>
      </div>
      <ul className="flex items-center">
      {isStudent && (
        <li className="mr-1 p-4 text-white hover:text-emerald-400">
          <NavLink to="/home" className="font-bold">
            Home
          </NavLink>
        </li>)}
        {/* {isLoggedin && (
          <li className="mr-1 p-4 text-white text-xl hover:text-emerald-400 relative">
            <NavLink to="/" className="font-bold">
              <FiHeart />
            </NavLink>
            {toggleMenu && <Favorites />}
          </li>
        )}  */}
        {isStudent && (
          <li className="mr-3 p-4 text-gray-600 hover:text-emerald-600">
            <NavLink to="#" className="text-white text-xl">
              <RiNotification2Line />
            </NavLink>
          </li>
        )}
        { isStudent || (
          <li className="mr-1 p-4 text-white hover:text-emerald-400">
            <NavLink to="user/?query=login" className="font-bold">
              Login
            </NavLink>
          </li>
        )}
         {isStudent && (
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
            {toggleMenu && <DropDown handleLogout={handleLogout} role={isInstructor}/>}
          </li>
        )}
      </ul>
    </nav>
  );
};
