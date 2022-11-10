import { useEffect, useState } from "react";
import { useParams } from "react-router";
import singleProductReducer, {
  fetchSingleProduct,
} from "../redux/reducers/singleProduct";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Typography,
} from "@mui/material";

import { RootState } from "../redux/store";
import { addItemToCart } from "../redux/reducers/cart";
import { useAppSelector, useAppDispatch } from "../hooks/reactHooks";
import { Product } from "../types/products";

const ProductItem = () => {
  const params = useParams();
  const productSingleItem = useAppSelector(
    (state: RootState) => state.singleProductReducer
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (params.id != undefined) {
      let id = Number(params.id);
      dispatch(fetchSingleProduct(id));
    }
  }, []);

  const addToCart = (
    id: number,
    title: string,
    price: number,
    image: string
  ) => {
    dispatch(addItemToCart({ id, title, price, image }));
  };

  return (
    <Box>
      {productSingleItem.map((item) => (
        <Box display="flex">
          <ImageList>
            <ImageListItem key={item.id}>
              <img src={`${item.images}`} alt={item.title} loading="lazy" />
              <ImageListItemBar
                title={item.title}
                subtitle={item.price}
                actionIcon={
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    aria-label={`buy this ${item.title}`}
                    onClick={() =>
                      addToCart(item.id, item.title, item.price, item.images[0])
                    }
                  >
                    <ShoppingCartIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          </ImageList>
          <Typography variant="h5">{item.description}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ProductItem;
