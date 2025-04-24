import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./nav/Header";
import Footer from "./nav/Footer";
import "./itemstyle.css"; // Create this CSS file for styling

const Item = () => {
  const location = useLocation();
  const { item } = location.state || {};

  if (!item) {
    return <h2>Item not found!</h2>;
  }

  return (
    <div className="item-screen">
      <Header />
      <div className="item-details">
        <img src={item.img} alt={item.name} className="item-image" />
        <h2>{item.name}</h2>
        <p className="price">{item.price}</p>
        <button className="add-to-cart">Add to Cart</button>
      </div>
      <Footer />
    </div>
  );
};

export default Item;