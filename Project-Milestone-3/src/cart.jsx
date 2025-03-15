

function Cart({ items, clearCart, updateQuantity }) {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h2>Sweet Treats</h2>
      {items.map((item, index) => (
        <div key={index} className="cart-item">
          <img src={`/assets/${item.name}.jpg`} alt={item.name} className="cart-item-img" />
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
        </div>
      ))}
      <div className="clear-cart" onClick={clearCart}>Clear Cart</div>
    </div>
  );
}


export default Cart;
