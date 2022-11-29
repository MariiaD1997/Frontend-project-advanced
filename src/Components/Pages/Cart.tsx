import { useState } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppSelector, useAppDispatch } from "../hooks/reactHooks";
import { deleteFromCart } from "../redux/reducers/cart";
import { RootState } from "../redux/store";
import {
  Typography,
  Box,
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  ButtonGroup,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { increaseQuantity, decreaseQuantity } from "../redux/reducers/cart";

const Cart = () => {
  const cart = useAppSelector((state: RootState) => state.cartReducer);
  const dispatch = useAppDispatch();
  const deleteItem = (id: number) => {
    dispatch(deleteFromCart(id));
  };
  const incrQuantity = (id: number) => {
    dispatch(increaseQuantity({ id }));
  };
  const decrQuantity = (id: number) => {
    dispatch(decreaseQuantity({ id: id }));
  };
  return (
    <Box>
      {cart.length === 0 ? (
        <Box>
          <Typography variant="h4">Your Shopping Cart is Empty !!!</Typography>
          <Link to={"/products"}>Go Back Shopping! </Link>
        </Box>
      ) : (
        <Box display="flex">
          <ImageList cols={3}>
            {cart.map((item) => (
              <ImageListItem key={item.id}>
                <img src={`${item.image}`} alt={item.title} loading="lazy" />
                <ButtonGroup>
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    onClick={() => deleteItem(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    onClick={() => incrQuantity(item.id)}
                  >
                    <AddIcon />
                  </IconButton>
                  <Typography>{item.quantity}</Typography>
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    onClick={() => decrQuantity(item.id)}
                  >
                    <RemoveIcon />
                  </IconButton>
                </ButtonGroup>
                <Typography>{item.id}</Typography>
                <Typography>{item.title}</Typography>
                <Typography>{item.price * item.quantity}</Typography>
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      )}
    </Box>
  );
};

export default Cart;
