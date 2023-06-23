import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Cards from "../components/Card/Cards";

import { useGetAllcoursesQuery } from "../store/courseApiSlice";
import { Roller } from "react-awesome-spinners";

const SearchPage = () => {
  const location = useLocation();
  const {data} = useGetAllcoursesQuery();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query").toLowerCase();

  if (!data) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Roller color="lightgray" />
      </div>
    );
  } 

  const filtered = data.filter(
    (data) =>
      data.subject.toLowerCase() === query ||
      data.courseName.toLowerCase().includes(query)
  );

  let alertText;

  if (filtered.length === 0) {
    alertText = (
      <h3 className="mx-72 mt-6 mb-40">please enter a search value</h3>
    );
  }

  return (
    <div className="h-full my-32">
      <div className="p-8 mx-72 border-b-2 ">
        <h4 className="text-3xl font-bold text-gray-900">Search Results</h4>
      </div>
      {alertText}
      <Cards currentCourses={filtered} />
    </div>
  );
};

export default SearchPage;
