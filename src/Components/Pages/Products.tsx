import { useEffect, useState } from "react";
import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Button,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";

import { useAppSelector, useAppDispatch } from "../hooks/reactHooks";
import { RootState } from "../redux/store";
import { addItemToCart } from "../redux/reducers/cart";
import {
  fetchProducts,
  sortAsc,
  sortDesc,
  sortNames,
} from "../redux/reducers/products";

const Products = () => {
  const products = useAppSelector((state: RootState) => state.productsReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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

  const addToCart = (
    id: number,
    title: string,
    price: number,
    image: string
  ) => {
    dispatch(addItemToCart({ id, title, price, image, quantity: 1 }));
  };

  const [select, setSelect] = useState("");
  //i will change event type soon
  const selectHandler = (event: SelectChangeEvent) => {
    setSelect(event.target.value);
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
          <Select label="Sort by Price" value={select} onChange={selectHandler}>
            <MenuItem value="sortAsc" onClick={() => dispatch(sortAsc())}>
              First show cheap products
            </MenuItem>
            <MenuItem value="sortDesc" onClick={() => dispatch(sortDesc())}>
              First show expensive products
            </MenuItem>
            <MenuItem value="sortName" onClick={() => dispatch(sortNames())}>
              Sort by names
            </MenuItem>
          </Select>
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
        </Box>
      </Box>
      <ImageList sx={{ padding: 10 }} cols={3} gap={4}>
        {filter.map((item) => (
          <ImageListItem key={item.id} sx={{ margin: 1.5 }}>
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
            <ImageListItemBar
              position="top"
              actionPosition="right"
              actionIcon={
                <IconButton aria-label={`info about ${item.title}`}>
                  <Link to={`/products/${item.id}`}>
                    <InfoIcon></InfoIcon>
                  </Link>
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
