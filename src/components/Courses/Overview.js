import profile from "../../assets/avatar.png";
import { useGetUserProfileQuery } from "../../store/authApiSlice";

const parse = require("html-react-parser");

export const Overview = ({
  overview,
  instructorId
}) => {

  const {data} = useGetUserProfileQuery(instructorId);
  
  if(!data){

    return <p>...</p>

  }
  

  const {bio, username, profileImage} = data;

  const img = profileImage || profile; 
  
  const overviewPara = parse(bio.substring(0, 200)) + '...';

  return (
    <div className="flex">
      <div className="flex-auto w-4/5">
        <div className=" text-base leading-8 pr-20">{parse(overview)}</div>
      </div>
      <div className="p-4 bg-gray-50 flex flex-col justify-center items-center custom-w-40 custom-h-28">
        <h3 className="pb-3 text-gray-800">About Instructor</h3>
        <div
          className="bg-center bg-cover w-32 h-32 mb-1 rounded-full bg-green-400"
          style={{ backgroundImage: `url(${img})` }}
        ></div>
        <h3 className="pb-1 text-gray-800 font-bold">{username}</h3>
        {/* <h4 className="pb-2 text-gray-500">Lecturer</h4> */}
        <div className="text-left text-gray-500">
          {overviewPara}
        </div>
      </div>
    </div>
  );
};
