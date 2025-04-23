import React, { useState, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = ({ cartItemCount }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef(null);

  const isMenuPage = location.pathname === '/Menu';

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleSearch = useCallback((event) => {
    if (event.key === 'Enter') {
      const query = searchQuery.toLowerCase().trim();
      const items = document.querySelectorAll('.item h3');
      let found = false;

      items.forEach(item => {
        if (item.textContent.toLowerCase().includes(query)) {
          item.closest('section').scrollIntoView({ behavior: 'smooth' });
          found = true;
        }
      });

      if (!found) {
        alert('Item not found in the menu.');
      }
      // Maintain focus after search
      searchInputRef.current?.focus();
    }
  }, [searchQuery]);


  const handleCartClick = () => {
    if (!localStorage.getItem('isAuthenticated')) {
      alert('Please login to access your cart');
      navigate('/home');
      return;
    }
    navigate(cartItemCount === 0 ? '/emptycart' : '/cartPage');
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleAboutClick = () => {
    setShowAbout(!showAbout);
    setShowContact(false);
  };

  const handleContactClick = () => {
    setShowContact(!showContact);
    setShowAbout(false);
  };

  const handleOrderHistoryClick = () => {
    if (!localStorage.getItem('isAuthenticated')) {
      alert('Please login to view your order history');
      navigate('/home');
      return;
    }
    navigate('/OrderHistory');
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('cartItems');
    navigate('/home');
    window.location.reload();
  };

  const NavigationLinks = React.memo(() => (
    <>
      <li><a className="nav-link" href="/home">Home</a></li>
      <li><a className="nav-link" href="/Menu">Menu</a></li>
      <li><button className="nav-link" onClick={handleAboutClick}>About Us</button></li>
      <li><button className="nav-link" onClick={handleContactClick}>Contact Us</button></li>
      {localStorage.getItem('isAuthenticated') && (
        <>
          <li><button className="nav-link" onClick={handleOrderHistoryClick}>Order History</button></li>
          <li><button className="nav-link" onClick={handleLogout}>Logout</button></li>
        </>
      )}
      <li>
        <button className="cart" onClick={handleCartClick}>🛒 {cartItemCount}</button>
      </li>
      {isMenuPage && (
        <li className="search-item">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyUp={handleSearch}
          />
        </li>
      )}
    </>
  ));


  return (
    <header>
      <nav>
        <div className="logo-and-menu">
          <h1 className="logo">Sweet Treats</h1>
          <div className="menu-icon" onClick={toggleSidebar}>☰</div>
        </div>

        <ul className="nav-links">
          <NavigationLinks />
        </ul>

        {sidebarOpen && (
          <div className="sidebar">
            <ul>
              <NavigationLinks />
            </ul>
          </div>
        )}
      </nav>

      {showAbout && (
        <div className="info-box">
          <h2>About Sweet Treats</h2>
          <p>
            Welcome to Sweet Treats, your go-to dessert haven! We serve up happiness in every bite with our creamy ice creams, fluffy waffles, and refreshing shakes. Whether you're in the mood for a classic scoop 🍨, a loaded waffle 🧇, or a dreamy shake 🥤—we've got you covered! 🍬✨
          </p>
        </div>
      )}

      {showContact && (
        <div className="info-box">
          <h2>Contact Us</h2>
          <p>
            📧 Email: contact@sweettreats.com<br />
            📞 Phone: +92 300 1234567
          </p>
        </div>
      )}
    </header>
  );
};

export default Header;