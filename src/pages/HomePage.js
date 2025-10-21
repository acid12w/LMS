import CardOverView from "../components/Card/CardOverView";
import { CardLoader } from "../components/UI/loading/cardLoader";
import { useGetAllcoursesQuery } from "../store/courseApiSlice";

import bg1 from '../assets/hero-3.png'

const Home = () => {

  const {data} = useGetAllcoursesQuery();

  let content = null;
  let content1 = null;
  
  if(!data) {
    content =<CardLoader/>
    content1 =<CardLoader/>
  }else{ 
    const designData = data.filter(course => course.isPublished === true);
    content1 = <CardOverView data={designData} />
  }

 

  return (<>
    <section className=" md:py-8 md:px-20">
        <div className="bg-violet-200 p-16 md:rounded-lg rounded-none bg-center bg-cover h-96 flex flex-col justify-center" style={{backgroundImage: `url(${bg1})`}}>
            <h2 className="text-white mb-4 text-lg">Learn from the</h2>
            <h4 className="text-4xl font-bold text-white">Comfort of your own home</h4>
        </div>
   
      </section>
    <section className="bg-white py-4">
      <div className="py-8 text-center">  
        
        <h2 className="font-bold text-gray-900 text-4xl">Courses</h2>
      </div>
      {content1}
      {content}
    </section>
    </>
  );
};

export default Home;