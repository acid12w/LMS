import profile from "../../assets/avatar.png";
import { useGetUserProfileQuery } from "../../store/authApiSlice";
// import { Roller } from "react-awesome-spinners";

const parse = require("html-react-parser");

export const Overview = ({
  overview,
  instructorId
}) => {

  const {data} = useGetUserProfileQuery(instructorId);
  
  if(!data){
    // return <Roller color="lightgray" />;
    return <p>...</p>
  }
  
  const {bio, username, profileUrl} = data;

  const img = profileUrl || profile; 

  return (
    <div className="flex">
      <div className="flex-auto w-4/5">
        <div className=" text-base leading-8 pr-20">{parse(overview)}</div>
      </div>
      <div className="p-4 bg-gray-50 flex flex-col justify-center items-center custom-w-40 custom-h-28">
        <h3 className="pb-3">About Instructor</h3>
        <div
          className="bg-center bg-cover w-32 h-32 mb-1 rounded-full bg-green-400"
          style={{ backgroundImage: `url(${img})` }}
        ></div>
        <h3 className="pb-1 font-bold">{username}</h3>
        <h4 className="pb-2">Lecturer</h4>
        <div className="text-center">
          {parse(bio.substring(0, 200))}
        </div>
      </div>
    </div>
  );
};
