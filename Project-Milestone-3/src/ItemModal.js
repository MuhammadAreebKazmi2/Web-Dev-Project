import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; 
import './ItemModal.css';
import { useCart } from './CartContext'; 
import { useNavigate } from "react-router-dom";

const ItemModal = ({ setCartItemCount }) => {
  const location = useLocation(); //for getting the location of item 

  const { item } = location.state || {}; //getting the item from the state passed in navigation in menu component
  const { addToCart } = useCart();  // Access addToCart function from context
  const [quantity, setQuantity] = useState(1);
  const [selectedToppings, setSelectedToppings] = useState(new Set());
  const [selectedBase, setSelectedBase] = useState('chocolate'); //state for base selection
  const navigate = useNavigate();

  const toppingOptions = [
    { id: 'oreo', label: 'Oreo Crumbs - Rs. 10', price: 10 },
    { id: 'whipped', label: 'Whipped Cream - Rs. 15', price: 15 },
    { id: 'choco', label: 'Chocolate Drizzle - Rs. 20', price: 20 },
    { id: 'cherry', label: 'Cherries - Rs. 10', price: 10 },
    { id: 'nuts', label: 'Crushed Nuts - Rs. 12', price: 12 },
    { id: 'marshmallows', label: 'Marshmallows - Rs. 15', price: 15 },
    { id: 'caramel', label: 'Caramel Drizzle - Rs. 18', price: 18 },
    { id: 'biscuits', label: 'Biscuit Crumbs - Rs. 8', price: 8 },
    { id: 'chocolateChips', label: 'Chocolate Chips - Rs. 12', price: 12 },
    { id: 'mango', label: 'Mango Slices - Rs. 20', price: 20 },
    { id: 'peanutButter', label: 'Peanut Butter - Rs. 17', price: 17 },
    { id: 'strawberries', label: 'Strawberries - Rs. 18', price: 18 },
    { id: 'honey', label: 'Honey Drizzle - Rs. 15', price: 15 },
    { id: 'banana', label: 'Banana Slices - Rs. 10', price: 10 }
  ];

  const MAX_TOPPINGS = 8; //limit to 8 toppings

  const handleToppingChange = (e) => {
    const { id, checked } = e.target;
    setSelectedToppings((prevToppings) => {
      const newToppings = new Set(prevToppings);
      if (checked) {
        if (newToppings.size < MAX_TOPPINGS) {
          newToppings.add(id);
        } else {
          alert(`You can select a maximum of ${MAX_TOPPINGS} toppings.`);
          return prevToppings;
        }
      } else {
        newToppings.delete(id);
      }
      return newToppings;
    });
  };

  // Base price and total price calculation
  const basePrice = parseFloat(item.price) || 0;
  const totalToppingPrice = Array.from(selectedToppings).reduce((acc, toppingId) => {
    const topping = toppingOptions.find(option => option.id === toppingId);
    return acc + (topping ? topping.price : 0);
  }, 0);
  
  // New variable to calculate price of a single item (with selected toppings, base, and quantity)
  const itemTotalPrice = (basePrice + totalToppingPrice) * quantity;

  const handleAddToCart = () => {
    if (quantity < 1) {
      alert('Please select a valid quantity.');
      return;
    }
    if (!selectedBase) {
      alert('Please select a base for your item.');
      return;
    }

    // Ensure price is being passed correctly
    const itemWithPrice = {
      ...item,
      price: itemTotalPrice,  // Use itemTotalPrice for the specific item
    };

    addToCart(itemWithPrice, quantity);  // Add to the cart with the calculated price
    alert(`Added to cart: Total Price Rs. ${itemTotalPrice}`);
    navigate(`/Menu`);
  };

  const handleClose = () => {
    navigate(`/Menu`);
  };

  if (!item) {
    return <div>Error: Item data is missing.</div>;
  }

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h5>{item.name}</h5> 
          <button className="close" onClick={handleClose}>X</button>
        </div>
        <div className="modal-body">
          <div className="modal-image">
            <img src={item.img} alt={item.name} />
          </div>
          <div className="modal-details">
            <p>{item.description || 'No description available.'}</p>
            <div className="form-group">
              <label>Select Base</label>
              <select
                value={selectedBase}
                onChange={(e) => setSelectedBase(e.target.value)}
              >
                <option value="chocolate">Chocolate Base</option>
                <option value="vanilla">Vanilla Base</option>
              </select>
            </div>
            <div className="form-group">
              <label>Select Toppings</label>
              <div>
                {toppingOptions.map(topping => (
                  <div key={topping.id}>
                    <input
                      type="checkbox"
                      id={topping.id}
                      onChange={handleToppingChange}
                    />
                    <label htmlFor={topping.id}>{topping.label}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
              />
            </div>
            <p>Total Price: Rs. {itemTotalPrice}</p>
            <button className="btn-add-to-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
