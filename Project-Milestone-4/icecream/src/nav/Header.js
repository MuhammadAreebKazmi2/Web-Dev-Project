import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Import user icon from react-icons
import './Headerstyles.css';

const Header = ({ cartItemCount }) => {
  // const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [showAbout, setShowAbout] = useState(false);
  // const [showContact, setShowContact] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const navigate = useNavigate();
  // const location = useLocation();
  // const searchInputRef = useRef(null);

  // const isMenuPage = location.pathname === '/Menu';
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  // const handleSearchChange = useCallback((e) => {
  //   setSearchQuery(e.target.value);
  // }, []);

  // const handleSearch = useCallback((event) => {
  //   if (event.key === 'Enter') {
  //     const query = searchQuery.toLowerCase().trim();
  //     const items = document.querySelectorAll('.item h3');
  //     let found = false;

  //     items.forEach(item => {
  //       if (item.textContent.toLowerCase().includes(query)) {
  //         item.closest('section').scrollIntoView({ behavior: 'smooth' });
  //         found = true;
  //       }
  //     });

  //     if (!found) {
  //       alert('Item not found in the menu.');
  //     }
  //     searchInputRef.current?.focus();
  //   }
  // }, [searchQuery]);

  const handleCartClick = () => {
    if (!isAuthenticated) {
      alert('Please login to access your cart');
      navigate('/home');
      return;
    }
    navigate(cartItemCount === 0 ? '/emptycart' : '/cartPage');
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleUserDropdown = () => setShowUserDropdown(!showUserDropdown);

  // const handleAboutClick = () => {
  //   setShowAbout(!showAbout);
  //   setShowContact(false);
  // };

  // const handleContactClick = () => {
  //   setShowContact(!showContact);
  //   setShowAbout(false);
  // };

  const handleOrderHistoryClick = () => {
    if (!isAuthenticated) {
      alert('Please login to view your order history');
      navigate('/home');
      return;
    }
    navigate('/OrderHistory');
    setShowUserDropdown(false);
  };

  const handleEditAccountClick = () => {
    if (!isAuthenticated) {
      alert('Please login to edit your account');
      navigate('/home');
      return;
    }
    navigate('/editAccount');
    setShowUserDropdown(false);
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
      {/* <li><button className="nav-link" onClick={handleAboutClick}>About Us</button></li>
      <li><button className="nav-link" onClick={handleContactClick}>Contact Us</button></li> */}
      <li>
        <button className="cart" onClick={handleCartClick}> 🛒 {cartItemCount}</button>
      </li>
      {/* {isMenuPage && (
        <li className="search-item">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyUp={handleSearch}
          />
        </li> */}
      
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
          {isAuthenticated && (
            <li className="user-dropdown-container">
              <button 
                className="user-icon" 
                onClick={toggleUserDropdown}
                aria-label="User menu"
              >
                <FaUserCircle size={24} />
              </button>
              {showUserDropdown && (
                <div className="user-dropdown">
                  <button onClick={handleOrderHistoryClick}>Order History</button>
                  <button onClick={handleEditAccountClick}>Edit Account</button>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </li>
          )}
        </ul>

        {sidebarOpen && (
          <div className="sidebar">
            <ul>
              <NavigationLinks />
              {isAuthenticated && (
                <>
                  <li><button className="nav-link" onClick={handleOrderHistoryClick}>Order History</button></li>
                  <li><button className="nav-link" onClick={handleEditAccountClick}>Edit Account</button></li>
                  <li><button className="nav-link" onClick={handleLogout}>Logout</button></li>
                </>
              )}
            </ul>
          </div>
        )}
      </nav>

      {/* {showAbout && (
        <div className="info-box">
          <h2>About Sweet Treats</h2>
          <p>
            Welcome to Sweet Treats, your go-to dessert haven! We serve up happiness in every bite with our creamy ice creams, fluffy waffles, and refreshing shakes.
          </p>
        </div>
      )} */}

      {/* {showContact && (
        <div className="info-box">
          <h2>Contact Us</h2>
          <p>
            📧 Email: contact@sweettreats.com<br />
            📞 Phone: +92 300 1234567
          </p>
        </div>
      )} */}
    </header>
  );
};



export default Header;