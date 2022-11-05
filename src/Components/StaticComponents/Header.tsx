import { Link } from "react-router-dom";
import React, { useContext } from "react";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { IconButton, useTheme } from "@mui/material";

import { Box, AppBar } from "@mui/material";
import SearchField from "./SearchField";
import { ThemeContext } from "../../App";

const Header = () => {
  const colorMode = useContext(ThemeContext);
  const theme = useTheme();
  return (
    <Box>
      <Box position="static">
        <IconButton
          onClick={() => colorMode.toggleMode()}
          style={{ color: "#000000" }}
        >
          {theme.palette.mode === "light" ? (
            <WbSunnyIcon />
          ) : (
            <NightsStayIcon />
          )}
        </IconButton>
        <Box></Box>
        <SearchField></SearchField>
      </Box>
      <Box>
        <Link to="">Home</Link>
        <Link to="products">Products</Link>
        <Link to="cart">Cart</Link>
        <Link to="profile">Profile</Link>
        <Link to="users">Users</Link>
        <Link to="useritem">User</Link>
      </Box>
    </Box>
  );
};

export default Header;
