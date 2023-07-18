import { useState } from "react";

import { GiRoundStar } from "react-icons/gi";
import { UilTimes } from "@iconscout/react-unicons";

import { useUpdateCourseMutation } from "../../store/courseApiSlice";

export const StarRaing = ({ courseId, setShowRating }) => {

  const [selected, setSelected] = useState(null);
  const [hover, setHover] = useState(null);

  const [updateCourse] = useUpdateCourseMutation();

  return (
    <div className="overflow-hidden drop-shadow-lg h-36 flex flex-col justify-center text-center bg-white border-b-8 border-yellow-400 rounded-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <UilTimes
        className="absolute top-2 right-2 text-xl text-gray-400 p-1 bg-gray-100 rounded-full cursor-pointer"
        onClick={() => setShowRating(false)}
      />
      <h4 className="text-gray-900 px-4 py-2">How has this course been?</h4>
      <div className="flex items-center justify-center px-4 py-2">
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          
          return (
            <GiRoundStar
              key={ratingValue}
              className={`text-2xl ${
                ratingValue <= (hover || selected)
                  ? "text-yellow-500"
                  : "fill-gray-400"
              }`}
              onClick={() => {
                setSelected(ratingValue);
                setShowRating(false);
                console.log(ratingValue);
                updateCourse({id : courseId, data: { rating: ratingValue }});
              }}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          );
        })}
      </div>
    </div>
  );
};
