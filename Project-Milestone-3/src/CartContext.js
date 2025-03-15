import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Retrieve cart data from localStorage on initial load
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems)); // Parse and set the stored data
    }
  }, []);

  // Save cart data to localStorage whenever cartItems change
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Save cart items to localStorage
    }
  }, [cartItems]);

  const addToCart = (item, quantity) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];
      const existingItemIndex = updatedItems.findIndex(i => i.name === item.name);
      if (existingItemIndex >= 0) {
        updatedItems[existingItemIndex].quantity += quantity;
      } else {
        updatedItems.push({ ...item, quantity });
      }
      return updatedItems;
    });
  };

  const updateQuantity = (index, quantity) => {
    const updatedItems = [...cartItems];
    updatedItems[index].quantity = quantity;
    setCartItems(updatedItems);
  };

  // New removeItem function
  const removeItem = (index) => {
    const updatedItems = cartItems.filter((_, i) => i !== index); // Remove item by index
    setCartItems(updatedItems);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems'); // Clear cart data from localStorage when cart is cleared
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
