import { useState } from "react";

import Cards from "./Cards";

import { Pagination } from "../UI/Pagination";

const Card = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(4);

  const indexofLastPage = currentPage * coursesPerPage;
  const indexOfFirstPage = indexofLastPage - coursesPerPage;

  const currentCourses = data.slice(indexOfFirstPage, indexofLastPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Cards currentCourses={currentCourses} />
      <Pagination
        PerPagecourses={coursesPerPage}
        totalCourses={data.length}
        onPaginate={paginate}
      />
    </>
  );
};

export default Card;
