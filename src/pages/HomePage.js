import CardOverView from "../components/Card/CardOverView";
import Hero from "../components/Layout/Hero";
import StartedCourses from "../components/StartedCourses/StartedCourses";

import { useGetAllcoursesQuery } from "../store/courseApiSlice";

const Home = () => {

  const {data} = useGetAllcoursesQuery();

  return (
    <>
      <Hero />
      <section className="bg-gray-100 py-4">
        <StartedCourses />
        <div className="text-center py-8 ">
          <h4 className="text-green-600 font-semibold ml-2">Check out our</h4>
          <h2 className="font-bold text-3xl">Featured Courses</h2>
        </div>
{/* 
        <Cards currentCourses={featuredCourses} /> */}
        <div className=" py-8 mx-72 ">
          <h4 className="text-green-600 font-semibold ">Check out our</h4>
          <h2 className="font-bold text-gray-900 text-3xl">Design Courses</h2>
        </div>
      {data  && <CardOverView data={data} />}
        {/* <div className=" py-8 mx-72 ">
          <h4 className="text-green-600 font-semibold ">Check out our</h4>
          <h2 className="font-bold text-gray-900 text-3xl">
            Web development courses
          </h2>
        </div> */}
        {/* <CardOverView data={techCourses} /> */}
      </section>
    </>
  );
};

export default Home;
