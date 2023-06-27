import { useParams } from "react-router-dom";
import YoutubeEmbed from "../components/UI/YoutubeEmbeded";
import { useGetAllcoursesQuery } from "../store/courseApiSlice";


import { Roller } from "react-awesome-spinners";

// import { Roller } from "react-awesome-spinners";


const parse = require("html-react-parser");

const CourseOverviewPage = () => {

  const {data} = useGetAllcoursesQuery();
  const param = useParams();  

  if (!data) {
    return (
      <div className="h-screen flex justify-center items-center"> 

        <Roller color="lightgray" />

        {/* <Roller color="lightgray" /> */}<p>...</p>

      </div>
    );
  }

  const currentCourse = data.find((data) => data._id === param.id);

  const { courseName, overview, subject, rating, modifiedDate } = currentCourse;

  return (
    <div>
      <div className="bg-gray-900 p-10 ">
        <div className="w-2/3 m-auto ">
          <h2 className="text-white text-3xl font-bold">{courseName}</h2>
          <h4 className="text-white text-sm">Rating: {rating}</h4>
          {/* <h4 className="text-white text-sm">Created by: Adrian Anderson</h4> */}
          <h4 className="text-white text-sm">last update: {modifiedDate}</h4>
        </div>
      </div>
      <article className="p-6">
        <div className="w-2/3 m-auto mb-8">
          <h4 className="mb-4 text-lg font-bold">Intro Video</h4>
          <YoutubeEmbed embedId="https://www.youtube.com/watch?v=d_BhzHVV4aQ&ab_channel=TraversyMedia" />
        </div>
        <div className="w-2/3 m-auto">
          {/* <h3 className="text-lg">Requirements</h3>
          <ul className="mb-6">
            <li>
              You should know JavasScript pretty well before learning React or
              any framework
            </li>
          </ul> */}
          <h3 className="text-lg">Description</h3>
          <div className="text-sm mb-4">{parse(overview)}</div>
        </div>
      </article>
    </div>
  );
};

export default CourseOverviewPage;
