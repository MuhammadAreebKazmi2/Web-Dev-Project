import React, { useState } from 'react';
import './homestyle.css'; // Keep it for SweetTreats
import { useNavigate } from 'react-router-dom';

const SweetTreats = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(); 
  };

  const handleLogin = () => {
    if (username.trim() === '' || password.trim() === '') {
      alert('Please enter both username and password!');
      return;
    }

    const loginInfo = {
      username,
      isAuthenticated: true
    };

    navigate('/Menu', { state: { loginInfo } });
  };

  return (
    <div className="sweet-treats-container">
      <section className="sweet-treats-background-section"></section>
      <div className="sweet-treats-login-container">
        <h2>Already have an account?</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <div className="sweet-treats-username-container">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required
            />
          </div>

          <label htmlFor="password">Password</label>
          <div className="sweet-treats-password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
            <span
              className="sweet-treats-toggle-password"
              onClick={togglePassword}
              style={{ cursor: 'pointer' }}
            >
              👁️
            </span>
          </div>

          <button type="submit" className="sweet-treats-login-button">Log in</button>
        </form>
      </div>
    </div>
  );
};

export default SweetTreats;
