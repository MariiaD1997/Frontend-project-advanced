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

const Cart = () => {
  const cart = useAppSelector((state: RootState) => state.cartReducer);
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(0);
  const deleteItem = (id: number) => {
    dispatch(deleteFromCart(id));
  };
  return (
    <Box>
      {cart.length === 0 ? (
        <Box>
          <Typography variant="h4">Your Shopping Cart is Empty !!!</Typography>
          <Link to={"/products"}>Go Back Shopping! </Link>
        </Box>
      ) : (
        cart.map((item) => (
          <Box display="flex">
            <ImageList cols={3}>
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
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <AddIcon />
                  </IconButton>
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    onClick={() => setQuantity(quantity - 1)}
                  >
                    <RemoveIcon />
                  </IconButton>
                </ButtonGroup>
                <Typography>{quantity}</Typography>
                <Typography>{item.price * quantity}</Typography>
              </ImageListItem>
            </ImageList>
          </Box>
        ))
      )}
    </Box>
  );
};

export default Cart;
