import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ cartItemCount, setCartItemCount }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false); // Track if the sidebar is open
  const navigate = useNavigate();

  // Handle search functionality
  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      let query = searchQuery.toLowerCase().trim();
      let items = document.querySelectorAll('.item h3');
      let found = false;

      items.forEach(item => {
        if (item.textContent.toLowerCase().includes(query)) {
          item.closest('section').scrollIntoView({ behavior: 'smooth' });
          found = true;
          return;
        }
      });

      if (!found) {
        alert('Item not found in the menu.');
      }
    }
  };

  // Navigate based on cartItemCount
  const handleCartClick = () => {
    if (cartItemCount === 0) {
      navigate('/emptycart');
    } else {
      navigate('/cartPage');
    }
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // This will toggle the sidebar visibility
  };

  return (
    <header>
      <nav>
        {/* Logo and Mobile Menu Icon for smaller screens */}
        <div className="logo-and-menu">
          <h1 className="logo">Sweet Treats</h1>
          <div className="menu-icon" onClick={toggleSidebar}>
            ☰
          </div>
        </div>

        {/* Sidebar for small screens */}
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <ul>
            <li className="nav-item"><a className="nav-link" href="/home">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="/Menu">Menu</a></li>
            <li className="nav-item"><a className="nav-link" href="/aboutus">About Us</a></li>
            <li className="nav-item"><a className="nav-link" href="/contactus">Contact Us</a></li>
            <li className="nav-item">
              <button className="cart" onClick={handleCartClick}>
                🛒 {cartItemCount} Items
              </button>
            </li>
            {/* Search Bar Inside Sidebar */}
            <li className="search-item">
              <input
                type="text"
                id="searchInput"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyUp={handleSearch}
              />
            </li>
          </ul>
        </div>

        {/* Desktop Navigation */}
        <ul className="nav-links">
          <li className="nav-item"><a className="nav-link" href="/home">Home</a></li>
          <li className="nav-item"><a className="nav-link" href="/Menu">Menu</a></li>
          <li className="nav-item"><a className="nav-link" href="/aboutus">About Us</a></li>
          <li className="nav-item"><a className="nav-link" href="/contactus">Contact Us</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
