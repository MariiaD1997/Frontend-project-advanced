import React from "react";
import { useParams } from "react-router";
import { useAppSelector } from "../hooks/reactHooks";
import singleProductReducer from "../redux/reducers/singleProduct";
import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { RootState } from "../redux/store";

const ProductItem = () => {
  const params = useParams();
  const productSingleItem = useAppSelector(
    (state: RootState) => state.singleProductReducer
  );

  return (
    <Box>
      {productSingleItem.map((item) => (
        <Box display="flex">
          <ImageList>
            <ImageListItem key={item.id}>
              <img src={`${item.images}`} alt={item.title} loading="lazy" />
              <ImageListItemBar title={item.title} subtitle={item.price} />
            </ImageListItem>
          </ImageList>
          <Typography variant="h4">{item.description}</Typography>
          <Button>Add to cart</Button>
        </Box>
      ))}
    </Box>
  );
};

export default ProductItem;
