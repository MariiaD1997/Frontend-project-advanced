import React, { useEffect } from "react";
import { Box, ListItem, Grid } from "@mui/material";
import { Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../hooks/reactHooks";
import { RootState } from "../redux/store";
import { fetchProducts } from "../redux/reducers/products";
import ProductItem from "./ProductItem";
const Products = () => {
  const products = useAppSelector((state: RootState) => state.productsReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <Box>
      <Grid container display="flex">
        <p>Product</p>
        {products.map((item) => (
          <Grid md={4}>
            <ListItem key={item.id}>
              <p>{item.title}</p>
              <img src={`${item.images}`}></img>
              <p>{item.price}</p>
              <Link to={`/products/${item.id}`}></Link>
            </ListItem>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Products;
