import CardOverView from "../components/Card/CardOverView";
import Hero from "../components/Layout/Hero";
// import StartedCourses from "../components/StartedCourses/StartedCourses";
// import Cards  from "../components/Card/Cards"

import { useGetAllcoursesQuery } from "../store/courseApiSlice";
import  img_1  from "../assets/study-group-african-people-min.jpg";

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
      <section className="py-20 px-24 flex items-center justify-center gap-12 bg-gray-100">
        <div className="w-3/12 h-96 overflow-hidden">
          <img src={img_1} alt='students writing on a white board' className="w-full"/>
        </div>
        <article className="w-6/12">
          <h4 className="text-xl font-bold pb-4">Welcome to SG-LMS</h4>
          <p className="text-sm text-gray-600 pb-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. 
          </p>
          {/* <h5 className="text-sm text-emerald-400">Know more</h5> */}
        </article>
      </section>
      <section className="flex flex-col items-center bg-gray-100">
        <h2 className="text-xl font-bold pb-4">Our Top Categories</h2>
        <h4 className="text-center">It is a long established fact that a reader will be distracted by the readable<br/> content of a page when looking at its layout.</h4>
        <div className="p-10 flex gap-12">

          <div className="px-14 py-12 bg-white shadow-md text-center rounded-md">
            <div className="p-4 shadow-md rounded-full mb-1">
              <MdOutlineDraw className="text-4xl "/> 
            </div>
            <h3 className="text-lg">Design</h3>
            <h4 className="text-xs text-gray-400">View More</h4>
          </div>

          <div className="px-14 py-12 bg-white shadow-md text-center rounded-md">
            <div className="p-4 shadow-md rounded-full mb-1">
              <CgCode className="text-4xl "/> 
            </div>
            <h3 className="text-lg">Design</h3>
            <h4 className="text-xs text-gray-400">View More</h4>
          </div>

          <div className="px-14 py-12 bg-white shadow-md text-center rounded-md">
            <div className="p-4 shadow-md rounded-full mb-1">
              <VscGraph className="text-4xl "/> 
            </div>
            <h3 className="text-lg">Design</h3>
            <h4 className="text-xs text-gray-400">View More</h4>
          </div>

          <div className="px-14 py-12 bg-white shadow-md text-center rounded-md">
            <div className="p-4 shadow-md rounded-full mb-1">
              <RiPaintFill className="text-4xl "/> 
            </div>
            <h3 className="text-lg">Design</h3>
            <h4 className="text-xs text-gray-400">View More</h4>
          </div>

        </div>
      </section>
      <section className="bg-gray-100 py-4">
        <div className=" py-8 mx-60 ">
          <h2 className="font-bold text-gray-900 text-3xl">Some of our popular courses</h2>
        </div>
      {content}
      </section>
    </>
  );
};

export default Landing;
