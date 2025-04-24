import React from 'react';
import './Sidebar.css';  // Import your CSS for Sidebar styling

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <ul>
        <li><a href="/Home">Home</a></li>
        <li><a href="/Menu">Menu</a></li>
        <li><a href="/OrderHistory">Order History</a></li>
        <li><a href="/EditAccount">Edit Account</a></li>
        {/* <li><a href="/CreateAccount">Create Account</a></li> */}
        <li><a href="/cartPage">Cart</a></li>
      </ul>

      {/* Close Button */}
      <button className="close-sidebar" onClick={toggleSidebar}>X</button>
    </div>
  );
};

export default Sidebar;
