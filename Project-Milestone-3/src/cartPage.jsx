import React, { useEffect } from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import './cartstyle.css'; // Assuming you will put all the CSS styles here

function CartPage() {
  const { cartItems, clearCart, updateQuantity, removeItem } = useCart();  // Access the cart items and functions from the context
  const [tip, setTip] = React.useState(0);  // Local state for tip
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/emptycart');  // Redirect to empty cart page if no items in the cart
    }
  }, [cartItems, navigate]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.13;  // Assuming 13% tax
  const deliveryFee = 100;
  const total = subtotal + tax + deliveryFee + tip;

  const orderPlace = () => {
    alert("Order Placed! Maze Karo!!");
  };

  return (
    <div className="cart-page"> {/* Added the cart-page class here */}
      <main className="main-content">
        <div className="left-section">
          {/* Sweet Treats Section */}
          <div className="cart">
            <h2>Sweet Treats</h2>
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.img} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <div className="product-name">{item.name}</div>
                  <div className="product-price">Price: Rs. {item.price}</div>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(index, parseInt(e.target.value, 10))}
                    min="1"
                  />
                </div>
                <button className="remove-item" onClick={() => removeItem(index)}>
                  🗑️ {/* Dustbin icon */}
                </button>
              </div>
            ))}
            <button className="clear" onClick={clearCart}>Clear Cart</button>
          </div>
        </div>

        <div className="right-section">
          <div className="bill-payment">
            <h3>Bill and Payment</h3>
            <div>Subtotal: Rs. {subtotal}</div>
            <div>Tax Applied: Rs. {tax}</div>
            <div>Delivery Fee: Rs. {deliveryFee}</div>
            <label>
              Tip Your Rider:
              <input
                type="number"
                value={tip}
                onChange={(e) => setTip(parseInt(e.target.value, 10))}
              />
            </label>
            <div>Total: Rs. {total}</div>
            <button onClick={orderPlace}>Confirm Order</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CartPage;
