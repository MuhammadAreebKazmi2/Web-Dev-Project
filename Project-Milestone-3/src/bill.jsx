import React from 'react';

function BillAndPayment({ cartItems, tip, setTip }) {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.13;  // Assuming 13% tax
  const deliveryFee = 100;

  const total = subtotal + tax + deliveryFee + tip;

  return (
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
      <button>Confirm Order</button>
    </div>
  );
}

export default BillAndPayment;
