import React, { useEffect } from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import './cartstyle.css'; // Assuming you will put all the CSS styles here

function CartPage() {
  const { cartItems, clearCart, updateQuantity, removeItem, toppingOptions } = useCart();  // Access the cart items and functions from the context
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

  const orderPlace = async () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
  
    // Get the userId from context or localStorage
    const userId = localStorage.getItem('userId');
  
    if (!userId) {
      alert('Please log in to place an order.');
      return;
    }
  
    // Price breakdown
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.18;  // Assuming 10% tax
    const deliveryFee = 100;
    const tip = 0;  // Tip can be fetched from state
    const total = subtotal + tax + deliveryFee + tip;
  
    // Prepare the order data
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
      totalPrice: total,  // Include the total price here
    };
  
    try {
      // Send the order data to the backend
      const response = await fetch('https://backend-eight-kohl-24.vercel.app/api/order/place-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Order placed successfully!');
        clearCart(); // Optionally clear the cart after placing the order
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
                  <div className="product-price">Price: Rs. {item.price}</div>
                  
                  {/* Base */}
                  <div className='selected-base-1'>
                    <strong>Base:</strong> {item.selectedBase}
                  </div>
                  
                  {/* Toppings */}
                  <div className="selected-toppings-1">
                    <strong>Toppings:</strong> 
                    {item.selectedToppings && item.selectedToppings.length > 0 
                      ? item.selectedToppings.map(toppingId => {
                          const topping = toppingOptions.find(option => option.id === toppingId);
                          return topping ? topping.label.split(' - ')[0] : null;
                        }).join(", ") 
                      : "None"}
                  </div>

                  {/* Quantity */}
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(index, parseInt(e.target.value, 10))}
                    min="1"
                    max="10"  // Optional: Max quantity for items (if needed)
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
              <input className='rider'
                type="number"
                value={tip}
                onChange={(e) => setTip(parseInt(e.target.value, 10))}
                min="0"
              />
            </label>
            <div><strong>Total: Rs. {total}</strong></div>
            <></>
            <label>Delivery Address: <input className='address'></input></label>
            <></>
            <button onClick={orderPlace}>Confirm Order</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CartPage;
