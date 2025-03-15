import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';

const Header = ({ cartItemCount, setCartItemCount }) => {
    const [searchQuery, setSearchQuery] = useState('');
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

  //navigate based on cartItemCount
  //this i sfor substantial requirement 
  const handleCartClick = () => {
    if (cartItemCount === 0) {
      navigate('/emptycart');  // Redirect to EmptyCart if cartItemCount is 0
    } else {
      navigate('/cartPage');  // Redirect to CartPage if cartItemCount > 0
    }
  };

  return (
    <header>
      <nav>
        <h1 className="logo">Sweet Treats</h1>
        <ul>
          <li className="nav-item"><a className="nav-link" href="/home">Home</a></li>
          <li className="nav-item"><a className="nav-link" href="/Menu">Menu</a></li>
          <li className="nav-item"><a className="nav-link" href="/aboutus">About Us</a></li>
          <li className="nav-item"><a className="nav-link" href="/contactus">Contact Us</a></li>
        </ul>

        <input
          type="text"
          id="searchInput"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyUp={handleSearch}
        />

        {/*conditionally navigate to /cart or /emptycart based on cartItemCount */}
        <span>
          <button className="cart" id="cartLink" onClick={handleCartClick}>
            🛒
          </button>
        </span>
      </nav>
    </header>
  );
};

export default Header;
