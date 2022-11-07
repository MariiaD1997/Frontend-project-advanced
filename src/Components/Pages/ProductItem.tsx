import React from "react";
import { useParams } from "react-router";
import { useAppSelector } from "../hooks/reactHooks";
import singleProductReducer from "../redux/reducers/singleProduct";

const ProductItem = () => {
  const params = useParams();
  const productSingleItem = useAppSelector(
    (state: RootState) => state.singleProductReducer
  );

  return <Box>
    
  </Box>;
};

export default ProductItem;
