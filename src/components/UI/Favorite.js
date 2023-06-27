import React, { useState } from "react";

import { MdAddCircleOutline } from "react-icons/md";


export const Favorite = ({ addStatredCourse }) => {

  const [favorite, setFavorite] = useState(false);

  return (
    <div className="bg-white absolute left-3/4 top-2 rounded-full flex justify-center items-center w-10 h-10">
      <MdAddCircleOutline
        className={`w-6 h-6 fill-orange-500 ${  
          favorite ? "fill-green-500" : ""
        }`}
        onClick={() => {
          setFavorite(!favorite);
          addStatredCourse()
        }}
      />
    </div>
  );
};
