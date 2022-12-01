import { Link } from "react-router-dom";
import React, { useContext } from "react";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { IconButton, useTheme } from "@mui/material";

import { Box, AppBar, Typography } from "@mui/material";
import { ThemeContext } from "../../App";

const Header = () => {
  const colorMode = useContext(ThemeContext);
  const theme = useTheme();
  return (
    <AppBar position="static">
      <Box display="flex" justifyContent="space-around">
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
        <Typography variant="h4">BE YOURSELF</Typography>
        <Box
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          padding={2}
          gap={4}
        >
          <Link to="">Home</Link>
          <Link to="products">Products</Link>
          <Link to="cart">Cart</Link>
          <Link to="profile">Profile</Link>
        </Box>
      </Box>
    </AppBar>
  );
};

export default Header;
