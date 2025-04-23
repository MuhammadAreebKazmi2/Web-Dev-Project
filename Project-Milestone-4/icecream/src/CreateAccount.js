import React, { useState } from 'react';
import './homestyle.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateAccount = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [editEnabled, setEditEnabled] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleRegister();
  };

  const handleRegister = async () => {
    const newErrors = {};

    if (!username.trim()) newErrors.username = 'Username is required.';
    if (!email.trim()) newErrors.email = 'Email is required.';
    if (!dob.trim()) newErrors.dob = 'Date of birth is required.';
    if (!password.trim()) newErrors.password = 'Password is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password,
        dob,
        email,
      });

      console.log(res.data);
      setEditEnabled(true);

      const loginInfo = {
        username,
        isAuthenticated: true,
      };

      navigate('/Menu', { state: { loginInfo } });
    } catch (err) {
      console.error('Registration failed:', err);
      setErrors({ username: 'Username already exists or server error.' });
    }
  };

  return (
    <div className="sweet-treats-container">
      <section className="sweet-treats-background-section"></section>
      <div className="sweet-treats-login-container">
        <h2>Create an account</h2>
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="sweet-treats-input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {errors.username && <p className="error-message">{errors.username}</p>}
          </div>

          {/* Email Field */}
          <div className="sweet-treats-input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          {/* DOB Field */}
          <div className="sweet-treats-input-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
            {errors.dob && <p className="error-message">{errors.dob}</p>}
          </div>

          {/* Password Field */}
          <div className="sweet-treats-input-group">
            <label htmlFor="password">Password</label>
            <div className="sweet-treats-password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="sweet-treats-toggle-password"
                onClick={togglePassword}
              >
                👁️
              </span>
            </div>
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>

          <button type="submit" className="sweet-treats-submit-button">
            Submit
          </button>

          <button
            type="button"
            className="sweet-treats-submit-button"
            style={{ marginTop: '10px', opacity: editEnabled ? 1 : 0.5 }}
            disabled={!editEnabled}
            // onClick={() => alert('Now you can edit your info!')}
          >
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
