import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { FiSearch } from "react-icons/fi";
import { IoMdMenu } from "react-icons/io";
import { useSignoutMutation } from "../../store/authApiSlice";

import avatar from "../../assets/avatar.png";
import { DropDown } from "../UI/dropDown";
// import { NotificationDropdown } from "../UI/NotificationDropdown"
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
  // const [toggleNotification, setToggleNotification] = useState(false);
  const [isTeacher, setToggleIsTeacher] = useState(false);

  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState();
  const [setPersist] = usePersist();

  const {isInstructor, isStudent} = useAuth();

  

  let isAuth = isInstructor || isStudent;
  const urlLink = isAuth ? '/home' : '/';



 
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


  const img = user?.profileImage ? user?.profileImage : avatar;

  const handleAuthState = () => {
    setToggleIsTeacher(!isTeacher);
  }


  let bgStyle = {
    backgroundImage: `url(${img})`,
  };

  return (
    <>
    <nav className="w-full">
  <div className="w-full flex flex-wrap items-center justify-between p-4">
    <Link className="font-bold p-4 text-emerald-950" to={urlLink}>LMS</Link>
  <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                  {/* {isAuth || (<li className="text-gray-600 hover:bg-gray-100 list-none text-xs rounded p-2 mr-4" onClick={()=> {handleAuthState()}}>
                      {isTeacher ? "Teacher mode" : "Student mode"}
                  </li>)} */}
        {isAuth || (
                  <li className="mr-1 p-4 text-gray-600 hover:text-green-600 list-none">
                    <NavLink to="user/?query=login" className="font-bold">
                      Login
                    </NavLink>
                  </li>
                )}
          {isAuth && (
                  <div
                    className="" 
                    onClick={() => {
                      setToggleMenu(!toggleMenu);
                    }}
                  >
                    <div
                      className="h-12 w-12 bg-center bg-cover rounded-full bg-green-400"
                      style={bgStyle}
                    ></div>
                    {toggleMenu && <DropDown userName={user.currentUsername} handleLogout={handleLogout} role={isTeacher}/>}
                  </div>
          )}
      {isAuth && <button onClick={() => setToggleDropDown(!toggleDropDown)} data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="navbar-user" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <FiSearch className="text-gray-600 text-lg " />
    </button>}
     {isAuth && <button  data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="navbar-user" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <IoMdMenu className="text-gray-600 text-lg " />
    </button>}
  </div>
 
  <div className={`items-center justify-between ${toggleDropDown ? 'visible' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-user">
  <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
   <li className=""> 
  {isAuth && <div className="flex items-center justify-center p-2 bg-gray-100 rounded-full">
        <FiSearch className="text-gray-800 text-lg " />
        <form className="" onSubmit={submitForm}>
          <input
            type="search" 
            placeholder="Search..."
            onChange={(e) => setSearchValue(e.target.value)}
            className="p-1 border-none outline-none bg-gray-100 placeholder:text-gray-600"
          />
        </form>
      </div>}
    </li>
    </ul>
  </div>
  </div>
</nav>

    </>
  );
};
