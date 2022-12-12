import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import { Box } from "@mui/system";
import { Product } from "../types/products";
import { useAppSelector } from "../hooks/reactHooks";
interface PaginationProps {
  filter: Product[];
  setProdList: React.Dispatch<React.SetStateAction<Product[]>>;
}

const PaginationControlled = (props: PaginationProps) => {
  const products = useAppSelector((state) => state.productsReducer);
  const [page, setPage] = useState(1);
  const prodPerPage = 15;
  const [pagination, setPagination] = useState({
    count: 0,
    firstIndex: 0,
    lastIndex: prodPerPage,
  });
  useEffect(() => {
    const firstIndex = pagination.firstIndex;
    const lastIndex = pagination.lastIndex;
    const currentProd = props.filter.slice(firstIndex, lastIndex);
    const showOnPage = {
      count: props.filter.length,
      data: currentProd,
    };
    setPagination({ ...pagination, count: showOnPage.count });
    props.setProdList(showOnPage.data);
  }, [
    products,
    pagination.firstIndex,
    pagination.lastIndex,
    props.filter.length,
  ]);
  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
    const firstIndex = (page - 1) * prodPerPage;
    const lastIndex = (page - 1) * prodPerPage + prodPerPage;
    setPagination({
      ...pagination,
      lastIndex: lastIndex,
      firstIndex: firstIndex,
    });
  };

  return (
    <Box display={"flex"} justifyContent={"center"} alignItems="center">
      <Pagination
        count={Math.ceil(pagination.count / prodPerPage)}
        onChange={handleChange}
        page={page}
      />
    </Box>
  );
};
export default PaginationControlled;
