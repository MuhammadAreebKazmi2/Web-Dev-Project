import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditAccount = () => {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    console.log('Fetching user with ID:', userId); // Debug log
    
    if (userId) {
      axios.get(`http://localhost:5000/api/auth/user/${userId}`)
        .then((response) => {
          console.log('User data received:', response.data); // Debug log
          setUsername(response.data.username);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Full error details:', err);
          console.error('Error response:', err.response);
          setErrorMessage('Error loading user data');
          setLoading(false);
        });
    } else {
      setErrorMessage('User not logged in');
      setLoading(false);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Add validation
    if (!newPassword.trim()) {
      setErrorMessage('Please enter a new password.');
      return;
    }
  
    try {
      const userId = localStorage.getItem('userId');
      console.log('Attempting to update user:', userId); // Debug log
      
      const response = await axios.put(
        `http://localhost:5000/api/auth/update/${userId}`,
        {
          username,
          password: newPassword,
        }
      );
  
      console.log('Update response:', response); // Debug log
      
      if (response.status === 200) {
        alert('Account updated successfully');
        navigate('/Menu');
      }
    } catch (err) {
      console.error('Full update error:', err);
      console.error('Error response:', err.response);
      setErrorMessage(err.response?.data?.message || 'Failed to update account');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your account?')) {
      return;
    }
  
    try {
      const userId = localStorage.getItem('userId');
      console.log('Attempting to delete user:', userId); // Debug log
      
      const response = await axios.delete(
        `http://localhost:5000/api/auth/delete/${userId}`
      );
  
      console.log('Delete response:', response); // Debug log
      
      if (response.status === 200) {
        alert('Account deleted successfully');
        localStorage.clear();
        navigate('/Home');
      }
    } catch (err) {
      console.error('Full delete error:', err);
      console.error('Error response:', err.response);
      setErrorMessage(err.response?.data?.message || 'Error deleting account');
    }
  };

  if (loading) {
    return <div>Loading user data...</div>;
  }

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2>Edit Account</h2>
      {errorMessage && (
        <div style={{ color: 'red', marginBottom: '15px' }}>{errorMessage}</div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div>
          <label htmlFor="newPassword" style={{ display: 'block', marginBottom: '5px' }}>
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button 
          type="submit" 
          style={{ 
            padding: '10px', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            cursor: 'pointer' 
          }}
        >
          Update Account
        </button>
      </form>

      <button 
        onClick={handleDelete} 
        style={{ 
          marginTop: '20px', 
          padding: '10px',
          backgroundColor: '#f44336', 
          color: 'white', 
          border: 'none', 
          cursor: 'pointer',
          width: '100%'
        }}
      >
        Delete Account
      </button>
    </div>
  );
};

export default EditAccount;