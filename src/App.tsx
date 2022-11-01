import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import Cart from "./Components/Cart";
import Home from "./Components/Home";
import ProductItem from "./Components/ProductItem";
import Products from "./Components/Products";
import Profile from "./Components/Profile";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Link to="">Home</Link>
          <Link to="products">Products</Link>
          <Link to="cart">Cart</Link>
          <Link to="profile">Profile</Link>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products">
            <Route path="" element={<Products />} />
            <Route path=":id" element={<ProductItem />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
