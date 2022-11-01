import React from "react";
import {Link } from "react-router-dom";

const Header = () => {
  return <div>
    <div>
          <Link to="">Home</Link>
          <Link to="products">Products</Link>
          <Link to="cart">Cart</Link>
          <Link to="profile">Profile</Link>
        </div>
  </div>;
};

export default Header;
