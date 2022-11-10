import { useEffect, useState } from "react";
import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Button,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppSelector, useAppDispatch } from "../hooks/reactHooks";
import { RootState } from "../redux/store";
import { fetchProducts } from "../redux/reducers/products";
import { addItemToCart } from "../redux/reducers/cart";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const lastPage = 15;

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
    dispatch(addItemToCart({ id, title, price, image }));
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
