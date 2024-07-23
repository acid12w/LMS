import CardOverView from "../components/Card/CardOverView";
import Hero from "../components/Layout/Hero";

import { Link } from "react-router-dom";

// import StartedCourses from "../components/StartedCourses/StartedCourses";
// import Cards  from "../components/Card/Cards"

import { useGetAllcoursesQuery } from "../store/courseApiSlice";
import  img_1  from "../assets/icon-design.svg";
import  img_2  from "../assets/icon-code.svg";
import  img_3  from "../assets/icon-analysis.svg";
import  img_mission  from "../assets/mission-graphic.png";
import  img_why  from "../assets/why.png";

import pic1 from '../assets/african-american-man-wearing-stylish-hat.jpg';
import pic2 from '../assets/ben-den-engelsen-YUu9UAcOKZ4-unsplash-min.jpg';
import pic3 from '../assets/christopher-campbell-rDEOVtE7vOs-unsplash.jpg';

import bg1 from '../assets/bg1.png'

import { MdOutlineDraw } from 'react-icons/md';
import { CgCode } from 'react-icons/cg';
import { VscGraph } from 'react-icons/vsc';
import { RiPaintFill } from 'react-icons/ri';

import { CardLoader } from "../components/UI/loading/cardLoader";

const Landing = () => {

  const {data} = useGetAllcoursesQuery();

  let content;

  if(!data) {
    content = <CardLoader/>
  }else{
    content = <CardOverView data={data} />
  }

  // const featuredCourses = data.filter(course => course.isFeatured === true);
  // const courseData = data.filter(course => course.isFeatured !== true);

  return (
    <>
      <Hero />
      <section className="py-14 px-8 sm:px-8  md:px-10">
        <h2 className="text-3xl text-center mb-8">Services</h2>
        <div className="flex flex-wrap items-center justify-center gap-16">
          <div className="text-center">
            <img src={img_1} className="w-1/4 m-auto" />
            <h3 className="mt-4" ><strong>Custom Design:</strong></h3>
            <h4>Unique, responsive designs <br></br> tailored to your brand.</h4>
          </div>
          <div className="text-center">
            <img src={img_2} className="w-1/4 m-auto" />
            <h3 className="mt-4" ><strong>Development: </strong></h3>
            <h4>Robust, scalable websites using <br></br> the latest technologies.</h4>
          </div>
          <div className="text-center">
            <img src={img_3} className="w-1/4 m-auto" />
            <h3 className="mt-4" ><strong>Marketing: </strong></h3>
            <h4>Comprehensive online store <br></br> setup and management.</h4>
          </div>
        </div>
        
      </section>

      <section className="flex items-center justify-center flex-wrap py-14 px-8 sm:px-8  md:px-10 gap-y-8 gap-x-24">
        <img className="w-full sm:w-5/12" src={img_mission}/>
        <div className="max-w-42">
          <h5 className="text-emerald-900 mb-2">Our Mission</h5>
          <h4 className="text-lg font-semibold mb-4">Nurturing talent fueling growth</h4>
          <p className="mb-4">we aim to Empower students with Effective Website Management Solutions</p>
          <div className="flex">
            <div className="flex mr-4">
              <svg className="bg-emerald-900 rounded-full p-3 mr-2" width="52" height="52" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.625 25.0811V18.375C23.625 14.0248 20.1002 10.5 15.75 10.5C11.3998 10.5 7.875 14.0248 7.875 18.375V25.0811C3.18642 26.9012 0 30.249 0 34.125C0 34.589 0 39.375 0 39.375C0 40.826 1.17403 42 2.625 42H28.875C30.326 42 31.5 40.826 31.5 39.375C31.5 39.375 31.5 34.589 31.5 34.125C31.5 30.249 28.3136 26.9012 23.625 25.0811ZM13.125 18.375C13.125 16.924 14.299 15.75 15.75 15.75C17.201 15.75 18.375 16.924 18.375 18.375V26.25C18.375 27.701 17.201 28.875 15.75 28.875C14.299 28.875 13.125 27.701 13.125 26.25V18.375ZM26.25 36.75H5.25V34.125C5.25 32.5305 6.70351 31.1181 8.94912 30.1542C10.3103 32.5177 12.8302 34.125 15.75 34.125C18.6698 34.125 21.1897 32.5177 22.5509 30.1542C24.7965 31.1181 26.25 32.5305 26.25 34.125V36.75ZM34.125 14.5811V7.875C34.125 3.5248 30.6002 0 26.25 0C21.8998 0 18.375 3.5248 18.375 7.875V8.24668C20.4488 8.78243 22.2561 9.93087 23.625 11.4972V7.875C23.625 6.42403 24.799 5.25 26.25 5.25C27.701 5.25 28.875 6.42403 28.875 7.875V15.75C28.875 17.201 27.701 18.375 26.25 18.375V23.625C29.1698 23.625 31.6897 22.0177 33.0509 19.6542C35.2965 20.6181 36.75 22.0305 36.75 23.625V26.25H27.1703C29.8133 27.6112 31.8435 29.4082 32.9996 31.5H39.375C40.826 31.5 42 30.326 42 28.875C42 28.875 42 24.089 42 23.625C42 19.749 38.8136 16.4012 34.125 14.5811Z" fill="#47C274"/>
              </svg>
              <div>
                <h4 className="font-bold text-emerald-900">10,000+</h4>
                <h5>Students</h5>
              </div>
              
            </div>
            <div className="flex">
            <svg className="bg-emerald-900 rounded-full p-3 mr-2" width="52" height="52" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_122_107)">
              <path d="M39 9.75C39 8.03644 37.8337 6.5715 36.1652 6.18638L20.3056 2.52647C20.0399 2.46675 19.7693 2.4375 19.5 2.4375C19.2307 2.4375 18.9601 2.46675 18.6773 2.53012L2.83481 6.18638C1.16513 6.5715 0 8.03644 0 9.75C0 11.4636 1.16634 12.9285 2.83359 13.3136L6.09375 14.0656V24.375C6.09375 27.6096 9.79631 30.4688 19.5 30.4688C29.2037 30.4688 32.9062 27.6096 32.9062 24.375V14.0656L36.1652 13.3136C37.8337 12.9285 39 11.4636 39 9.75ZM30.4688 24.375C30.4688 25.7217 26.8125 28.0312 19.5 28.0312C12.1875 28.0312 8.53125 25.7217 8.53125 24.375V14.6287L18.6932 16.9735C18.9589 17.0332 19.2307 17.0625 19.5 17.0625C19.7693 17.0625 20.0411 17.0332 20.3214 16.9699L30.4688 14.6287V24.375ZM19.7742 14.5945C19.6828 14.614 19.5914 14.625 19.5 14.625C19.4086 14.625 19.316 14.614 19.2258 14.5945L3.38203 10.9383C2.82872 10.8103 2.4375 10.3179 2.4375 9.75C2.4375 9.18206 2.82872 8.68969 3.38203 8.56172L19.2258 4.90547C19.316 4.88597 19.4074 4.875 19.5 4.875C19.5926 4.875 19.684 4.88597 19.7742 4.90547L35.618 8.56172C36.1701 8.68969 36.5625 9.18206 36.5625 9.75C36.5625 10.3179 36.1701 10.8103 35.618 10.9383L19.7742 14.5945ZM35.3438 15.8438C35.3438 15.1698 35.8885 14.625 36.5625 14.625C37.2352 14.625 37.7812 15.1698 37.7812 15.8438V26.8125C37.7812 27.4865 37.2352 28.0312 36.5625 28.0312C35.8885 28.0312 35.3438 27.4865 35.3438 26.8125V15.8438ZM36.5625 29.25C37.908 29.25 39 32.7795 39 34.125C39 35.4705 37.908 36.5625 36.5625 36.5625C35.2158 36.5625 34.125 35.4705 34.125 34.125C34.125 32.7795 35.2158 29.25 36.5625 29.25Z" fill="#47C274"/>
              </g>
              <defs>
              <clipPath id="clip0_122_107">
              <rect width="39" height="39" fill="white"/>
              </clipPath>
              </defs>
            </svg>

              <div>
                <h4 className="font-bold text-emerald-900">50+</h4>
                <h5>Teachers</h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-wrap bg-orange-50 py-14 px-8 sm:px-8  md:px-10 justify-around items-center gap-y-8 gap-x-24">
        <div>
          <h5 className="text-orange-400 mb-2">Why Choose Our LMS?</h5>
          <h4 className="text-lg font-semibold mb-4">Take your skills to the next level</h4>
          <ul className="text-orange-900">
            <li><h6 className="text-sm mb-4">Progress Tracking: Monitor your learning journey  with detailed analytics.</h6></li>
            <li><h6 className="text-sm mb-4">Interactive Learning: Engage with quizzes, assignments, and discussions.</h6></li>
            <li><h6 className="text-sm ">Diverse Course Library: Access a wide range of courses across various subjects.</h6></li>
          </ul>
        </div>
        <img className="w-full sm:w-5/12" src={img_why} />
      </section>
      
      <section className="p-10">
        <h2 className="text-2xl text-center mb-8">What Our clients was</h2>
        <div className="flex flex-wrap gap-y-10 sm:gap-6 justify-center p-6">

          <div className="bg-no-repeat rounded w-72 h-44 text-center p-4 shadow-2xl flex flex-col justify-center items-center relative"> 
            <div className="w-12 h-12 bg-center bg-cover rounded-full border-4 absolute top-[-24px]" style={{backgroundImage: `url(${pic1})`}}></div>
            <h5><strong>jane</strong></h5>
            <p className="text-xs">The variety of courses offered on this platform is impressive. I've been able to explore different fields and find my true passion.</p>
          </div>

          <div className="bg-no-repeat rounded w-72 h-44 text-center p-4 shadow-2xl flex flex-col justify-center items-center relative"> 
            <div className="w-12 h-12 bg-center bg-cover rounded-full border-4 absolute top-[-24px]" style={{backgroundImage: `url(${pic2})`}}></div>
            <h5><strong>jane</strong></h5>
            <p className="text-xs">The variety of courses offered on this platform is impressive. I've been able to explore different fields and find my true passion.</p>
          </div>

          <div className="bg-no-repeat rounded w-72 h-44 text-center p-4 shadow-2xl flex flex-col justify-center items-center relative"> 
            <div className="w-12 h-12 bg-center bg-cover rounded-full border-4 absolute top-[-24px]" style={{backgroundImage: `url(${pic3})`}}></div>
            <h5><strong>jane</strong></h5>
            <p className="text-xs">The variety of courses offered on this platform is impressive. I've been able to explore different fields and find my true passion.</p>
          </div>

        </div>
      </section>

      <section className=" md:py-8 md:px-28">
        <div className="bg-violet-200 p-16 rounded-lg bg-center bg-cover h-80 flex flex-col items-center justify-center" style={{backgroundImage: `url(${bg1})`}}>
            <h2 className="text-2xl font-bold text-center text-violet-900">Get started learning today</h2>
            <h4 className="text-center text-violet-900 mb-4">Dont wait to start learn new skills and leveling up</h4>
            <Link to="/user/?query=signup" className="justify-self-center">
            <button className="bg-violet-400 p-2 rounded text-violet-900" >Get started</button>
          </Link>
        </div>
   
      </section>

      {/* <section className="bg-gray-100 py-4">
        <div className=" py-8  md:mx-60 text-center">
          <h2 className="font-bold text-gray-900 text-3xl">Some of our popular courses</h2>
        </div>
      {content}
      </section> */}
    </>
  );
};

export default Landing;
