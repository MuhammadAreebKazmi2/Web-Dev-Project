import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; 
import './ItemModal.css';
import { useCart } from '../cart/CartContext'; 
import { useNavigate } from "react-router-dom";

const ItemModal = ({ setCartItemCount }) => {
  const location = useLocation(); // For getting the location of the item
  const { item } = location.state || {}; // Getting the item from the state passed in navigation in menu component
  const { addToCart } = useCart();  // Access addToCart function from context
  const [quantity, setQuantity] = useState(1);
  const [selectedToppings, setSelectedToppings] = useState(new Set());
  const [selectedBase, setSelectedBase] = useState('chocolate'); // State for base selection
  const [errorMessages, setErrorMessages] = useState({}); // State for error messages
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

  const MAX_TOPPINGS = 8; // Limit to 8 toppings

  const handleToppingChange = (e) => {
    const { id, checked } = e.target;
    setSelectedToppings((prevToppings) => {
      const newToppings = new Set(prevToppings);
      if (checked) {
        if (newToppings.size < MAX_TOPPINGS) {
          newToppings.add(id);
        } else {
          setErrorMessages(prev => ({ ...prev, topping: `You can select a maximum of ${MAX_TOPPINGS} toppings.` }));
          return prevToppings;
        }
      } else {
        newToppings.delete(id);
        setErrorMessages(prev => ({ ...prev, topping: '' })); // Clear topping error when removed
      }
      return newToppings;
    });
  };

  const basePrice = parseFloat(item.price) || 0;
  const totalToppingPrice = Array.from(selectedToppings).reduce((acc, toppingId) => {
    const topping = toppingOptions.find(option => option.id === toppingId);
    return acc + (topping ? topping.price : 0);
  }, 0);
  
  const itemTotalPrice = (basePrice + totalToppingPrice);

  const handleAddToCart = () => {
    const errors = {};
    
    if (quantity < 1) {
      errors.quantity = 'Please select a valid quantity.';
    }

    if (!selectedBase) {
      errors.base = 'Please select a base for your item.';
    }

    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors); // Set all errors to be displayed inline
      return;
    }

    const itemWithAddOns = {
      ...item,
      price: itemTotalPrice,
      selectedBase,
      selectedToppings: Array.from(selectedToppings) || [],
    }

    addToCart(itemWithAddOns, quantity);  // Add to the cart with the calculated price
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

            {/* Base Selection */}
            <div className="form-group">
              <label>Select Base</label>
              <select
                value={selectedBase}
                onChange={(e) => setSelectedBase(e.target.value)}
              >
                <option value="chocolate">Chocolate Base</option>
                <option value="vanilla">Vanilla Base</option>
              </select>
              {errorMessages.base && <p className="error-message">{errorMessages.base}</p>}
            </div>

            {/* Toppings Selection */}
            <div className="form-group">
              <label>Select Toppings</label>
              <div className='toppings'>
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
                {errorMessages.topping && <p className="error-message">{errorMessages.topping}</p>}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="form-group">
              <label>Quantity</label>
              <input className='quantity'
                type="number"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
              />
              {errorMessages.quantity && <p className="error-message">{errorMessages.quantity}</p>}
            </div>

            {/* Display Total Price */}
            <p>Single Price with toppings: Rs. {itemTotalPrice}</p>

            {/* Add to Cart Button */}
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
