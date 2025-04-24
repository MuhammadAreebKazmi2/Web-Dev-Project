import React, { useEffect, useState } from 'react';
import { useCart } from '../cart/CartContext';
import { useNavigate } from 'react-router-dom';
import './orderReceived.css';

function OrderReceived() {
  const { cartItems, clearCart, toppingOptions } = useCart();
  const [orderDetails, setOrderDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/');
      return;
    }

    const storedTip = localStorage.getItem('orderTip') || 0;
    const deliveryAddress = localStorage.getItem('deliveryAddress') || '';

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.13;
    const deliveryFee = 100;
    const tip = parseInt(storedTip, 10);
    const total = subtotal + tax + deliveryFee + tip;

    setOrderDetails({
      items: [...cartItems],
      subtotal,
      tax,
      deliveryFee,
      tip,
      total,
      deliveryAddress,
      // deliveryTime: "never",
      orderDate: new Date().toLocaleString()
    });

    return () => {
      clearCart();
      localStorage.removeItem('orderTip');
      localStorage.removeItem('deliveryAddress');
    };
  }, [cartItems, clearCart, navigate]);

  if (!orderDetails) {
    return <div className="loading">Loading your order details...</div>;
  }

  return (
    <div className="order-received-container">
      <h1>Order Received!</h1>
      <div className="receipt">
        <h2>Sweet Treats - Order Receipt</h2>
        <p className="order-date">Order Date: {orderDetails.orderDate}</p>
        
        <div className="items-section">
          <h3>Your Items:</h3>
          {orderDetails.items.map((item, index) => (
            <div key={index} className="receipt-item">
              <div className="item-image-container">
                <img src={item.img} alt={item.name} className="item-image" />
              </div>
              <div className="item-details">
                <div className="item-name">{item.quantity}x {item.name}</div>
                <div className="item-price">Rs. {item.price * item.quantity}</div>
                {item.selectedBase && (
                  <div className="item-base">Base: {item.selectedBase}</div>
                )}
                {item.selectedToppings && item.selectedToppings.length > 0 && (
                  <div className="item-toppings">
                    Toppings: {item.selectedToppings.map(toppingId => {
                      const topping = toppingOptions.find(option => option.id === toppingId);
                      return topping ? topping.label.split(' - ')[0] : null;
                    }).join(", ")}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="summary-section">
          <h3>Order Summary:</h3>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>Rs. {orderDetails.subtotal}</span>
          </div>
          <div className="summary-row">
            <span>Tax (13%):</span>
            <span>Rs. {orderDetails.tax}</span>
          </div>
          <div className="summary-row">
            <span>Delivery Fee:</span>
            <span>Rs. {orderDetails.deliveryFee}</span>
          </div>
          <div className="summary-row">
            <span>Tip:</span>
            <span>Rs. {orderDetails.tip}</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>Rs. {orderDetails.total}</span>
          </div>
        </div>

        <div className="delivery-info">
          {/* <h3>Delivery Information</h3> */}
          {/* <p>Estimated Delivery Time: {orderDetails.deliveryTime}</p> */}
          <p><strong>Delivery Address:</strong></p>
          {orderDetails.deliveryAddress}
        </div>

        <button className="back-to-menu" onClick={() => navigate('/menu')}>
          Back to Menu
        </button>
      </div>
    </div>
  );
}

export default OrderReceived;