import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './CartContext';
import MenuComponent from './AreebMenuComponent';
import SweetTreats from './home';
import CreateAccount from './CreateAccount';
import CartPage from './cartPage';
import ItemModal from './ItemModal';
import EmptyCart from './emptycart';
import OrderHistory from './orderHistory';
import EditAccount from './editAccount';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';  // Import Sidebar Component

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to toggle sidebar visibility

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle sidebar visibility
  };

  return (
    <CartProvider>
      <Header />

      <Routes>
        <Route path="/Home" element={<SweetTreats />} />  
        <Route path="/CreateAccount" element={<CreateAccount />} />  
        <Route path="/" element={<SweetTreats />} />  
        <Route path="/Menu" element={<MenuComponent />} />
        <Route path="/cartPage" element={<CartPage />} />
        <Route path="/emptycart" element={<EmptyCart />} />
        <Route path="/ItemModal" element={<ItemModal />} />
        <Route path="/OrderHistory" element={<OrderHistory />} />
        <Route path="/EditAccount" element={<EditAccount />} /> 
      </Routes>

      <Footer />
    </CartProvider>
  );
};

export default App;
