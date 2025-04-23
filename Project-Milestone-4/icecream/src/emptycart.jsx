import React, { useState } from 'react';
import './cartstyle.css'; // Assuming you will put all the CSS styles here
// import Header from './Header';
// import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [deliveryInfo, setDeliveryInfo] = useState({
    deliveringTo: "Home",
    deliveryType: "Standard",
  });
  const navigate = useNavigate();
  const [tip, setTip] = useState(0);

  const clearCart = () => {
    setCartItems([]);
  };

  const updateQuantity = (index, quantity) => {
    const newItems = [...cartItems];
    newItems[index].quantity = quantity;
    setCartItems(newItems);
  };

  const backMenu = () =>{
    navigate("/Menu")
  }

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const tax = subtotal * 0.13;  // Assuming 13% tax
  const deliveryFee = 100;
  const total = subtotal + tax + deliveryFee + tip;

  return (
    <div className="App">
      <main className="main-content">

        {/* Main content centered */}
        <div className="empty-cart-container">
          <div className="empty-cart-message">
            <img 
              src={`/sad.png`} 
              alt="Sad face" 
              className="empty-cart-icon" 
            />
            <p>You cannot order an empty cart. Please go back to our menu and find something to order.</p>
            <button className="back-to-menu-btn" onClick={backMenu}>Go Back to Menu</button>
          </div>
        </div>
        
      </main>
    </div>
  );
}

export default CartPage;
