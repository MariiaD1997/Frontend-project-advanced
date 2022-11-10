import React, { useState, createContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Grid } from "@mui/material";

import "./App.css";
import Cart from "./Components/Pages/Cart";
import Home from "./Components/Pages/Home";
import ProductItem from "./Components/Pages/ProductItem";
import Products from "./Components/Pages/Products";
import Profile from "./Components/Pages/LogIn";
import Footer from "./Components/StaticComponents/Footer";
import Header from "./Components/StaticComponents/Header";
import LogIn from "./Components/Pages/LogIn";
import SignIn from "./Components/Pages/SignIn";

export const ThemeContext = createContext({ toggleMode: () => {} });

function App() {
  const [mode, setMode] = useState<"dark" | "light">("light");
  const theme = createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: {
              main: "#018E42",
            },
            secondary: {
              main: "#700353",
            },
            text: {
              primary: "#07393C",
              secondary: "#93827F",
            },
            background: {
              default: "#E0D2C3",
            },
          }
        : {
            primary: { main: "#1b2845" },
            secondary: { main: "#7e7f9a" },
            text: {
              primary: "#e8ebe4",
              secondary: "#a30b37",
            },
            background: {
              default: "#1f2421",
            },
          }),
    },
  });

  const manageTheme = {
    toggleMode: () => {
      setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    },
  };

  return (
    <Grid item xs={12}>
      <ThemeContext.Provider value={manageTheme}>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              backgroundColor: "background.default",
              color: "text.primary",
            }}
            className="App"
          >
            <BrowserRouter>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="products/:id" element={<ProductItem />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<LogIn />} />
                <Route path='/signin' element={<SignIn />} />
              </Routes>
            </BrowserRouter>
            <Footer />
          </Box>
        </ThemeProvider>
      </ThemeContext.Provider>
    </Grid>
  );
}

export default App;
