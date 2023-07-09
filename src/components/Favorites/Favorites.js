import { useSelector } from "react-redux";

const Favorites = () => {
  const favorite = useSelector((state) => state.favoriteCourses.courses);

  console.log(favorite);

  return (
    <div className="bg-white h-60 w-72 absolute z-10 top-14 right--8 overflow-scroll p-2 cursor-pointer">
      {favorite.map((course) => {
        return (
          <div
            className="h-20 w-full flex border-b-2 border-gray-300"
            key={course.id}
          >
            <div className="w-32 mr-1 overflow-hidden bg-gray-100">
              <img
                className=""
                src={course.thumbNail}
                alt={course.courseName}
              />
            </div>

            <h4 className="text-black text-sm">{course.courseName}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default Favorites;
