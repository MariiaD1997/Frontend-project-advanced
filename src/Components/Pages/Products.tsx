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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";

import { useAppSelector, useAppDispatch } from "../hooks/reactHooks";
import { RootState } from "../redux/store";
import { addItemToCart } from "../redux/reducers/cart";
import { fetchProducts } from "../redux/reducers/products";
import { deleteOne } from "../redux/reducers/singleProduct";
import { fetchCategories } from "../redux/reducers/category";

const Products = () => {
  const products = useAppSelector((state: RootState) => state.productsReducer);
  const categories = useAppSelector(
    (state: RootState) => state.categoryReducer
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(
    (state: RootState) => state.usersReducer.currentUser
  );
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
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

  const selectHandler = (select: string) => {
    if (select === "asc") {
      setFilter([...filter].sort((a, b) => a.price - b.price));
    }
    if (select === "desc") {
      setFilter([...filter].sort((a, b) => b.price - a.price));
    }

    if (select === "sortNames") {
      setFilter([...filter].sort((a, b) => (a.title > b.title ? 1 : -1)));
    }
  };

  const navigateToProduct = (id: number) => {
    navigate(`/products/${id}`);
  };

  const onDelete = (id: number) => {
    dispatch(deleteOne(id));
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
          <Select label="Sort by Price">
            <MenuItem
              value="sortNames"
              onClick={() => {
                selectHandler("sortNames");
              }}
            >
              Sort by names
            </MenuItem>
            <MenuItem
              value="asc"
              onClick={() => {
                selectHandler("asc");
              }}
            >
              First show cheap products
            </MenuItem>
            <MenuItem
              value="desc"
              onClick={() => {
                selectHandler("desc");
              }}
            >
              First show expensive products
            </MenuItem>
          </Select>
          <Button
            onClick={() => {
              filterProducts("All");
              setFilter(products);
              setCategory("All");
            }}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => {
                filterProducts(category.name);
                setCategory(category.name);
              }}
            >
              {category.name}
            </Button>
          ))}
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
                    user?.role === "admin"
                      ? navigateToProduct(item.id)
                      : addToCart(
                          item.id,
                          item.title,
                          item.price,
                          item.images[0]
                        )
                  }
                >
                  {user?.role === "admin" ? "Edit" : <ShoppingCartIcon />}
                </IconButton>
              }
            />
            <ImageListItemBar
              position="top"
              actionPosition="right"
              actionIcon={
                <IconButton
                  aria-label={`info about ${item.title}`}
                  onClick={() =>
                    user?.role === "admin"
                      ? onDelete(item.id)
                      : navigateToProduct(item.id)
                  }
                >
                  {user?.role === "admin" ? "Delete" : <InfoIcon />}
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
