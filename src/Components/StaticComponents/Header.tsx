import React from "react";
import { Link } from "react-router-dom";

import { Box, AppBar } from "@mui/material";
import SwitchButton from "./SwitchButton";
import SearchField from "./SearchField";

const Header = () => {
  return (
    <Box>
      <AppBar position="static">
        <SwitchButton />
        <Box></Box>
        <SearchField></SearchField>
      </AppBar>
      <Box>
        <Link to="">Home</Link>
        <Link to="products">Products</Link>
        <Link to="cart">Cart</Link>
        <Link to="profile">Profile</Link>
      </Box>
    </Box>
  );
};

export default Header;
