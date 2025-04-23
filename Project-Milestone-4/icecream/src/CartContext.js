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

  // const addToCart = (item, quantity) => {
  //   setCartItems((prevItems) => {
  //     const updatedItems = [...prevItems];
  //     const existingItemIndex = updatedItems.findIndex(i => i.name === item.name);
  //     if (existingItemIndex >= 0) {
  //       updatedItems[existingItemIndex].quantity += quantity;
  //     } else {
  //       updatedItems.push({ ...item, quantity });
  //     }
  //     return updatedItems;
  //   });
  // };
  const addToCart = (item, quantity) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];
      const existingItemIndex = updatedItems.findIndex(i => i.name === item.name && i.selectedBase === item.selectedBase && JSON.stringify(i.selectedToppings) === JSON.stringify(item.selectedToppings));
    
      if (existingItemIndex >= 0) {
        updatedItems[existingItemIndex].quantity += quantity;
      } else {
        updatedItems.push({ 
          ...item, 
          quantity,
          selectedBase: item.selectedBase, 
          selectedToppings: item.selectedToppings || [],
          img: item.img  // Ensure the image path is added
        });
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

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeItem, clearCart, toppingOptions }}>
      {children}
    </CartContext.Provider>
  );
};
