import React, { useState } from 'react';
import './homestyle.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const SweetTreats = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin();
  };

  const handleLogin = async () => {
    setErrorMessage(''); // Clear any previous error

    if (username.trim() === '' || password.trim() === '') {
      setErrorMessage('Please enter both username and password!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });

      console.log('Login response:', response.data);

      if (response.data.user && response.data.user._id) {
        // Store user data in localStorage
        localStorage.setItem('userId', response.data.user._id);
        localStorage.setItem('username', response.data.user.username);
        localStorage.setItem('isAuthenticated', 'true');
        
        // Also pass user data via state for immediate use
        const loginInfo = {
          username: response.data.user.username,
          isAuthenticated: true,
          userId: response.data.user._id
        };

        navigate('/Menu', { state: { loginInfo } });
      } else {
        throw new Error('User data not received from server');
      }
    } catch (err) {
      console.error('Login failed:', err);

      if (err.response) {
        if (err.response.status === 401) {
          setErrorMessage('Invalid username or password!');
        } else {
          setErrorMessage(`Server error: ${err.response.data.message}`);
        }
      } else if (err.request) {
        setErrorMessage('Could not reach the server. Is it running?');
      } else {
        setErrorMessage(err.message || 'Unexpected error occurred.');
      }
    }
  };

  return (
    <div className="sweet-treats-container">
      <section className="sweet-treats-background-section"></section>
      <div className="sweet-treats-login-container">
        <h2>Already have an account?</h2>
        <form onSubmit={handleSubmit}>
          {/* Inline Error Message */}
          {errorMessage && (
            <div className="form-error-message">{errorMessage}</div>
          )}

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

        <div className="create-account-link">
          <p>Don't have an account? <Link to="/CreateAccount">Create one here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SweetTreats;