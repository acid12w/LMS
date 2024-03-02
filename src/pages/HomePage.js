import CardOverView from "../components/Card/CardOverView";
// import Hero from "../components/Layout/Hero";
// import StartedCourses from "../components/StartedCourses/StartedCourses";
// import Cards  from "../components/Card/Cards"

import { useGetAllcoursesQuery } from "../store/courseApiSlice";

const Home = () => {

  const {data} = useGetAllcoursesQuery();
  
  if(!data) {
    return <p>loading...</p>
  }

  const comSciData = data.filter(course => course.subject === "com sci");
  const designData = data.filter(course => course.subject === "design");

  return (
    <>
      <section className="bg-white py-4">
        {/* <StartedCourses /> */}
        {/* <div className="text-center py-4 ">
          <h4 className="text-green-600 font-semibold ml-2">Check out our</h4>
          <h2 className="font-bold text-3xl">Featured Courses</h2>
          {featuredCourses  && <CardOverView data={featuredCourses} />}
        </div> */}
{/* 
        <Cards currentCourses={featuredCourses} /> */}
        <div className="py-8 text-center">  
          {/* <h4 className="text-green-600 font-semibold ">Check out our</h4> */}
          <h2 className="font-bold text-gray-900 text-4xl">Courses</h2>
        </div>
      
      {comSciData  && <CardOverView data={comSciData} />}
      {designData  && <CardOverView data={designData} />}
      {/* {data  && <CardOverView data={data} />} */}
      </section>
    </>
  );
};

export default Home;
