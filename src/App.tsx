import React, { useState, createContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

import "./App.css";
import Cart from "./Components/Pages/Cart";
import Home from "./Components/Pages/Home";
import ProductItem from "./Components/Pages/ProductItem";
import Products from "./Components/Pages/Products";
import Profile from "./Components/Pages/Profile";
import Footer from "./Components/StaticComponents/Footer";
import Header from "./Components/StaticComponents/Header";
import Users from "./Components/Pages/Users";
import UserItem from "./Components/Pages/UserItem";

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
            primary: { main: "#000000" },
            secondary: { main: "#000000" },
            text: {
              primary: "#000000",
              secondary: "#1b2845",
            },
            background: {
              default: "#000000",
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
    <Box>
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
                <Route path="/products">
                  <Route path="" element={<Products />} />
                  <Route path=":id" element={<ProductItem />} />
                </Route>
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/users" element={<Users />} />
              </Routes>
            </BrowserRouter>
            <Footer />
          </Box>
        </ThemeProvider>
      </ThemeContext.Provider>
    </Box>
  );
}

export default App;
