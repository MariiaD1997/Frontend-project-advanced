import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import { Box } from "@mui/system";
import { current } from "@reduxjs/toolkit";
import { Product } from "../types/products";

const PaginationControlled = (props: {
  filter: any;
  currentProd: Product[];
}) => {
  const [page, setPage] = useState(1);
  const [prodPerPage] = useState(12);

  const indexOfLastProd = page * prodPerPage;
  const indexOfFirstProd = indexOfLastProd - prodPerPage;
  const currentProd = props.filter.slice(indexOfFirstProd, indexOfLastProd);
  const handleChange = () => {
    setPage(page);
  };

  return (
    <Box display={"flex"} justifyContent={"center"} alignItems="center">
      <Pagination
        count={Math.ceil(props.filter.length / prodPerPage)}
        onChange={handleChange}
        page={page}
      />
    </Box>
  );
};
export default PaginationControlled;
