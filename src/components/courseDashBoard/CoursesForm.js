import { useState } from "react";
import { Link} from "react-router-dom"; 

import { useSelector } from "react-redux";


import { MdOutlineModeEdit } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import {useGetCourseByInstructorQuery } from "../../store/courseApiSlice";



export const CoursesForm = () => {


const user = useSelector(
    (state) => state.auth.user
);

const {data: courses} = useGetCourseByInstructorQuery(user?.userId); 
const [toggleMenu, setToggleMenu] = useState(null);

if(!courses){
    return<p>loading</p>;
}

const handleMouseClick = (index) => {
    if (toggleMenu === index) {
        setToggleMenu(null);
    } else {
        setToggleMenu(index)
    }
}

return (
    
    <div class="">
        <div className="p-6">
            <Link to="/new-course" className="bg-green-600 w-max text-xs text-white px-2 py-2 rounded flex justify-center items-center gap-1"><IoIosAddCircleOutline className="w-3 h-3"/> Create course</Link>
        </div>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Title
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Status
                    </th>
                    <th scope="col" class="px-6 py-3">
                        
                    </th>
                </tr>
            </thead>
            <tbody>
                {courses.map((course, index) => {
                    return (
                        <tr
                            key={index} 
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"

                        >
                            <th scope="row" class="px-6 py-4 font-light text-gray-900 whitespace-nowrap dark:text-white">
                                {course.courseName}
                            </th>
                            <td class="px-6 py-4">
                                <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">{course.isPublished ? "published" : "Draft"}</span>
                            </td>
                        
                            <td class="px-6 py-4 ">
                            
                                <button index={index} onClick={(e) => {handleMouseClick(index)}} id="dropdownMenuIconHorizontalButton" data-dropdown-toggle="dropdownDotsHorizontal" class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button"> 
                                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                                </svg>
                                </button>
                                <div id="dropdownDotsHorizontal" class={`${toggleMenu === index ? "block" : "hidden" } shadow-md z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600`}>
                                    <ul class="p-1  text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
                                    <li >
                                        <Link to={`/my-course/${course._id}`} class="flex gap-2 px-4 py-2 text-green-800 font-medium rounded hover:bg-green-100 dark:hover:bg-gray-600 dark:hover:text-white"><MdOutlineModeEdit className="w-6 h-6" /> Edit</Link>
                                    </li>
                                
                                    </ul>
                                
                                </div>

                            </td>
                        </tr>
                    )
            })}
                
            </tbody>
        </table>
    </div>
  );
};

