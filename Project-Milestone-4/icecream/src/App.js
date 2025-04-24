import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './cart/CartContext';
import MenuComponent from './menu/AreebMenuComponent';
import SweetTreats from './login-signup/home';
import CreateAccount from './login-signup/CreateAccount';
import CartPage from './cart/cartPage';
import ItemModal from './menu/ItemModal';
import EmptyCart from './cart/emptycart';
import OrderHistory from './order/orderHistory';
import OrderReceived from './order/orderReceived';
import EditAccount from './editAccount';
import Header from './nav/Header';
import Footer from './nav/Footer';
// import Sidebar from './nav/Sidebar';  // Import Sidebar Component

const App = () => {
  // const [sidebarOpen, setSidebarOpen] = useState(false); // State to toggle sidebar visibility

  // const toggleSidebar = () => {
  //   setSidebarOpen(!sidebarOpen); // Toggle sidebar visibility
  // };

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
        <Route path="/orderreceived" element={<OrderReceived />} />
        <Route path="/EditAccount" element={<EditAccount />} /> 
      </Routes>

      <Footer />
    </CartProvider>
  );
};

export default App;
