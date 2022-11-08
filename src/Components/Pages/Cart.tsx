import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppSelector, useAppDispatch } from "../hooks/reactHooks";
import cartReducer, { deleteFromCart } from "../redux/reducers/cart";
import { RootState } from "../redux/store";
import {
  Typography,
  Box,
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
} from "@mui/material";

const Cart = () => {
  const cart = useAppSelector((state: RootState) => state.cartReducer);
  const dispatch = useAppDispatch();

  const deleteItem = (id: number) => {
    dispatch(deleteFromCart(id));
  };
  return (
    <Box>
      {cart.length === 0 ? (
        <Box>
          <Typography variant="h4">Your Shopping Cart is Empty !!!</Typography>
          <Button>Go Back Shopping! </Button>
        </Box>
      ) : (
        cart.map((item) => (
          <Box display="flex">
            <ImageList cols={3}>
              <ImageListItem key={item.id}>
                <img src={`${item.image}`} alt={item.title} loading="lazy" />
                <ImageListItemBar
                  title={item.title}
                  subtitle={item.price}
                  actionIcon={
                    <IconButton
                      sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                      aria-label={`info about ${item.title}`}
                      onClick={() => deleteItem(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            </ImageList>
          </Box>
        ))
      )}
    </Box>
  );
};

export default Cart;
