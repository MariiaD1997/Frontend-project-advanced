import React, { useEffect, useState } from "react";
import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Button,
  TextField,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks/reactHooks";
import { RootState } from "../redux/store";
import { fetchProducts } from "../redux/reducers/products";
import SearchIcon from "@mui/icons-material/Search";
import searchProduct from "../redux/reducers/products";
const Products = () => {
  const products = useAppSelector((state: RootState) => state.productsReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const [category, setCategory] = useState("All");
  const [filter, setFilter] = useState(products);
  const filterProducts = (category: string) => {
    const filtered = products.filter((item) => item.category.name === category);
    setFilter(filtered);
  };

  const [search, setSearch] = useState("");
  const searchProductItem = (search: string) => {
    const searched = products.filter((item) => item.title.includes(search));
    setFilter(searched);
  };
  return (
    <Box>
      <Box display="flex">
        <Box
          sx={{
            position: "relative",
            borderRadius: 5,
            marginLeft: 0,
            width: "30%",
          }}
        >
          <IconButton
            sx={{
              height: "100%",
              position: "absolute",
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SearchIcon />
          </IconButton>
          <TextField
            sx={{ marginLeft: 2 }}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              searchProductItem(search);
            }}
          />
        </Box>
        <Box gap={4}>
          <Button
            onClick={() => {
              setFilter(products);
              setCategory("All");
            }}
          >
            All
          </Button>
          <Button
            onClick={() => {
              filterProducts("Clothes");
              setCategory("Clothes");
            }}
          >
            Clothes
          </Button>
          <Button
            onClick={() => {
              filterProducts("Electronics");
              setCategory("Electronics");
            }}
          >
            Electronics
          </Button>
          <Button
            onClick={() => {
              filterProducts("Furniture");
              setCategory("Furniture");
            }}
          >
            Furniture
          </Button>
          <Button
            onClick={() => {
              filterProducts("Shoes");
              setCategory("Shoes");
            }}
          >
            Shoes
          </Button>
          <Button
            onClick={() => {
              filterProducts("Others");
              setCategory("Others");
            }}
          >
            Others
          </Button>
          <Button>Sort by price</Button>
        </Box>
      </Box>
      <ImageList sx={{ padding: 10 }} cols={4}>
        {filter.map((item) => (
          <ImageListItem key={item.id}>
            <img src={`${item.images}`} alt={item.title} loading="lazy" />
            <ImageListItemBar
              title={item.title}
              subtitle={item.price}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${item.title}`}
                >
                  <ShoppingCartIcon>
                    <Link to={`/products/${item.id}`}></Link>
                  </ShoppingCartIcon>
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default Products;
