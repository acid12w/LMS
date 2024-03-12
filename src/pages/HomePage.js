import CardOverView from "../components/Card/CardOverView";
import { CardLoader } from "../components/UI/loading/cardLoader";
import { useGetAllcoursesQuery } from "../store/courseApiSlice";

const Home = () => {

  const {data} = useGetAllcoursesQuery();

  let content = null;
  let content1 = null;
  
  if(!data) {
    content =<CardLoader/>
    content1 =<CardLoader/>
  }else{ 
    const comSciData = data.filter(course => course.subject === "com sci");
    const designData = data.filter(course => course.subject === "design");
    content = <CardOverView data={comSciData} />
    content1 = <CardOverView data={designData} />
  }

 

  return (
    <section className="bg-white py-4">
      <div className="py-8 text-center">  
        
        <h2 className="font-bold text-gray-900 text-4xl">Courses</h2>
      </div>
      {content1}
      {content}
    </section>
  );
};

export default Home;
