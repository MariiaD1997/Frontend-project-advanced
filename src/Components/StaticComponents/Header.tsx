import { Link } from "react-router-dom";
import { useContext } from "react";
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
      <Box
        display="flex"
        justifyContent="space-around"
        padding={2}
        alignItems="center"
      >
        <Box sx={{ position: "absolute", left: "0" }}>
          <IconButton onClick={() => colorMode.toggleMode()}>
            {theme.palette.mode === "light" ? (
              <WbSunnyIcon />
            ) : (
              <NightsStayIcon />
            )}
          </IconButton>
        </Box>

        <Typography variant="h4" sx={{ fontFamily: "Caveat" }}>
          BE YOURSELF
        </Typography>
        <Box
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          padding={2}
          gap={4}
        >
          <Link
            to=""
            style={{
              textDecoration: "none",
              fontSize: "4vh",
            }}
          >
            Home
          </Link>
          <Link
            to="products"
            style={{
              textDecoration: "none",
              fontSize: "4vh",
            }}
          >
            Products
          </Link>
          <Link
            to="cart"
            style={{
              textDecoration: "none",
              fontSize: "4vh",
            }}
          >
            Cart
          </Link>
          <Link
            to="profile"
            style={{
              textDecoration: "none",
              fontSize: "4vh",
            }}
          >
            Profile
          </Link>
        </Box>
      </Box>
    </AppBar>
  );
};

export default Header;
