import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import './cartstyle.css';

function CartPage() {
  const { cartItems, clearCart, updateQuantity, removeItem, toppingOptions } = useCart();
  const [tip, setTip] = useState(0);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [addressError, setAddressError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/emptycart');
    }
  }, [cartItems, navigate]);

  const calculateItemTotal = (item) => {
    return (item.price + (item.toppingsPrice || 0)) * item.quantity;
  };
  
  const subtotal = cartItems.reduce((acc, item) => acc + calculateItemTotal(item), 0);
  const tax = subtotal * 0.13;
  const deliveryFee = 100;
  const total = subtotal + tax + deliveryFee + tip;

  const orderPlace = async () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    // Validate address
    if (!deliveryAddress.trim()) {
      setAddressError('Please enter a valid delivery address');
      return;
    }
  
    localStorage.setItem('orderTip', tip.toString());
    localStorage.setItem('deliveryAddress', deliveryAddress);
    const userId = localStorage.getItem('userId');
  
    if (!userId) {
      alert('Please log in to place an order.');
      return;
    }
  
    const orderData = {
      userId,
      items: cartItems.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        selectedBase: item.selectedBase,
        selectedToppings: item.selectedToppings,
        img: item.img,
      })),
      subtotal,
      tax,
      deliveryFee,
      tip,
      totalPrice: total,
      deliveryAddress
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/order/place-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        navigate('/orderreceived');
      } else {
        alert('Failed to place the order');
        console.error('Order Error:', data);
      }
    } catch (error) {
      alert('An error occurred while placing the order');
      console.error('Error:', error);
    }
  };

  return (
    <div className="cart-page">
      <main className="main-content">
        <div className="left-section">
          <div className="cart">
            <h2>Sweet Treats</h2>
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.img} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <div className="product-name">{item.name}</div>
                  <div className="product-price">
                    Price: Rs. {item.price} × {item.quantity} = Rs. {item.price * item.quantity}
                  </div>
                
                <div className='selected-base'>
                  <strong>Base:</strong> {item.selectedBase}
                </div>
                
                <div className="selected-toppings">
                  <strong>Toppings:</strong> 
                  {item.selectedToppings && item.selectedToppings.length > 0 
                    ? item.selectedToppings.map(toppingId => {
                        const topping = toppingOptions.find(option => option.id === toppingId);
                        return topping ? topping.label.split(' - ')[0] : null;
                      }).join(", ") 
                    : "None"}
                </div>

                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(index, parseInt(e.target.value, 10))}
                  min="1"
                  max="10"
                />
              </div>
              <button className="remove-item" onClick={() => removeItem(index)}>
                🗑️
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
              onChange={(e) => setTip(parseInt(e.target.value || 0, 10))}
              min="0"
            />
          </label>
          <div>Total: Rs. {total}</div>
          <div className="address-input">
            <label>Delivery Address:</label>
            <textarea
              value={deliveryAddress}
              onChange={(e) => {
                setDeliveryAddress(e.target.value);
                setAddressError('');
              }}
              placeholder="Enter full delivery address"
              required
              rows="3"
            />
            {addressError && <div className="error-message">{addressError}</div>}
          </div>
          <button onClick={orderPlace}>Confirm Order</button>
        </div>
      </div>
    </main>
  </div>
  );
}

export default CartPage;
