import { useState, useEffect } from "react";

import { Box, TextField, Button, Typography } from "@mui/material";

import { RootState } from "../redux/store";
import { useAppSelector, useAppDispatch } from "../hooks/reactHooks";
import { deleteOne } from "../redux/reducers/singleProduct";
import { updateOne } from "../redux/reducers/products";

const ProductForm = () => {
  const [currentTitle, setTitle] = useState("");
  const [currentPrice, setPrice] = useState(0);
  const [currentDescr, setDescr] = useState("");
  const [currentImg, setImg] = useState("");
  const [categoryId, setId] = useState(0);
  const [currName, setName] = useState("");
  const [catImg, setCatImg] = useState("");

  const productItem = useAppSelector(
    (state: RootState) => state.singleProductReducer
  );
  const dispatch = useAppDispatch();
  const user = useAppSelector(
    (state: RootState) => state.usersReducer.currentUser
  );

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
          description: currentDescr,
          category: {
            id: Number(categoryId),
            name: currName,
            image: catImg,
          },
          images: [currentImg],
        },
      })
    );
  };

  useEffect(() => {
    if (productItem) {
      setTitle(productItem.title);
      setPrice(productItem.price);
      setDescr(productItem.description);
      setImg(productItem.images[0]);
      setId(productItem.category.id);
      setName(productItem.category.name);
      setCatImg(productItem.category.image);
    }
  }, []);

  return (
    <Box>
      <Box
        component="form"
        autoComplete="off"
        sx={{ display: user?.role === "admin" ? "flex" : "none" }}
      >
        <Box>
          <Typography>Change product characteristics</Typography>
          <TextField
            variant="filled"
            label="Change title"
            onChange={(e) => setTitle(e.target.value)}
            value={currentTitle}
          />
          <TextField
            variant="filled"
            label="Change price"
            onChange={(e) => setPrice(Number(e.target.value))}
            value={currentPrice}
          />

          <TextField
            variant="filled"
            label="Change image link"
            onChange={(e) => setImg(e.target.value)}
            value={[currentImg]}
          />
          <TextField
            variant="filled"
            label="Change description"
            onChange={(e) => setDescr(e.target.value)}
            value={currentDescr}
          />
        </Box>
        <Box>
          <Typography>Change category characteristics:</Typography>
          <TextField
            variant="filled"
            label="Change id"
            onChange={(e) => setId(Number(e.target.value))}
            value={categoryId}
          />
          <TextField
            variant="filled"
            label="Change category name"
            onChange={(e) => setName(e.target.value)}
            value={currName}
          />
          <TextField
            variant="filled"
            label="Change category image "
            onChange={(e) => setCatImg(e.target.value)}
            value={catImg}
          />
        </Box>
        <Button onClick={() => onUpdate(productItem?.id)}>Edit</Button>
        <Button onClick={() => onDelete(productItem?.id)}>Delete</Button>
      </Box>
    </Box>
  );
};
export default ProductForm;
