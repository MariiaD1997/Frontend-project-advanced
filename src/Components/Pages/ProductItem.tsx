import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchSingleProduct } from "../redux/reducers/singleProduct";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import { RootState } from "../redux/store";
import { addItemToCart } from "../redux/reducers/cart";
import { useAppSelector, useAppDispatch } from "../hooks/reactHooks";
import { deleteOne, updateOne } from "../redux/reducers/singleProduct";

const ProductItem = () => {
  const params = useParams();
  const productSingleItem = useAppSelector(
    (state: RootState) => state.singleProductReducer
  );
  const dispatch = useAppDispatch();
  const user = useAppSelector(
    (state: RootState) => state.usersReducer.currentUser
  );

  const [currentTitle, setTitle] = useState("");
  const [currentPrice, setPrice] = useState(0);

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
    dispatch(addItemToCart({ id, title, price, image, quantity: 1 }));
  };

  const onDelete = (id: number) => {
    dispatch(deleteOne(id));
  };

  const onUpdate = (id: number) => {
    dispatch(
      updateOne({
        id,
        data: {
          id: id,
          title: currentTitle,
          price: Number(currentPrice),
          description:
            "The Football Is Good For Training And Recreational Purposes",
          category: {
            id: 3,
            name: "Futniture",
            image: "https://api.lorem.space/image/furniture?w=640&h=480&r=5963",
          },
          images: [
            "https://api.lorem.space/image/fashion?w=640&h=480&r=8692",
            "https://api.lorem.space/image/fashion?w=640&h=480&r=5990",
            "https://api.lorem.space/image/fashion?w=640&h=480&r=6124",
          ],
        },
      })
    );
  };

  return (
    <Box>
      {productSingleItem.map((item) => (
        <Box display="flex" key={item.id}>
          <Box>
            <img src={`${item.images}`} alt={item.title} loading="lazy" />
            <Typography>{item.title}</Typography>
            <Typography>{item.price}</Typography>
            <IconButton
              sx={{ color: "rgba(255, 255, 255, 0.54)" }}
              aria-label={`buy this ${item.title}`}
              onClick={() =>
                user?.role === "admin"
                  ? onUpdate(item.id)
                  : addToCart(item.id, item.title, item.price, item.images[0])
              }
            >
              {user?.role === "admin" ? "Edit" : <ShoppingCartIcon />}
            </IconButton>
            <Box sx={{ display: user?.role === "admin" ? "flex" : "none" }}>
              <TextField
                variant="filled"
                label="Change title"
                value={currentTitle}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                variant="filled"
                label="Change price"
                value={currentPrice}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </Box>
            <IconButton
              onClick={() => (user?.role === "admin" ? onDelete(item.id) : "")}
            >
              {user?.role === "admin" ? "Delete" : ""}
            </IconButton>
          </Box>
          <Typography variant="h5">{item.description}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ProductItem;
