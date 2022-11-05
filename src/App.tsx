import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import Cart from "./Components/Pages/Cart";
import Home from "./Components/Pages/Home";
import ProductItem from "./Components/Pages/ProductItem";
import Products from "./Components/Pages/Products";
import Profile from "./Components/Pages/Profile";
import Footer from "./Components/StaticComponents/Footer";
import Header from "./Components/StaticComponents/Header";
import Users from "./Components/Pages/Users";

function App() {
  return (
    <div>
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
    </div>
  );
}

export default App;
