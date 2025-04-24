import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditAccount = () => {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false); // Track delete action
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    console.log('Fetching user with ID:', userId); // Debug log
    
    if (userId) {
      axios.get(`https://backend-eight-kohl-24.vercel.app/api/auth/user/${userId}`)
        .then((response) => {
          console.log('User data received:', response.data); // Debug log
          if (response.data && response.data.username) {
            setUsername(response.data.username); // Set the username from the response
          } else {
            setErrorMessage('Username not found in the response');
          }
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
        `https://backend-eight-kohl-24.vercel.app/api/auth/update/${userId}`,
        {
          username,  // Send the username to the backend
          password: newPassword,
        }
      );

      console.log('Update response:', response); // Debug log
      
      if (response.status === 200) {
        setSuccessMessage('Password updated successfully'); // Show success message inline
        setTimeout(() => setSuccessMessage(''), 5000); // Clear the success message after 5 seconds
      }
    } catch (err) {
      console.error('Full update error:', err);
      console.error('Error response:', err.response);
      setErrorMessage(err.response?.data?.message || 'Failed to update account');
    }
};

  const handleDelete = async () => {
    setDeleting(true); // Show loading while deleting
    
    try {
      const userId = localStorage.getItem('userId');
      console.log('Attempting to delete user:', userId); // Debug log
      
      const response = await axios.delete(
        `https://backend-eight-kohl-24.vercel.app/api/auth/delete/${userId}`
      );
  
      console.log('Delete response:', response); // Debug log
      
      if (response.status === 200) {
        setSuccessMessage('Account deleted successfully');
        localStorage.clear();
        setTimeout(() => navigate('/Home'), 5000); // Redirect to home after 3 seconds
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
    <div style={{ maxWidth: '500px', height: '73vh', margin: '0 auto', padding: '20px' }}>
  <h2>Edit Account</h2>

  {/* Show Error Message */}
  {errorMessage && (
    <div style={{ color: 'red', marginBottom: '15px' }}>{errorMessage}</div>
  )}

  {/* Show Success Message Inline */}
  {successMessage && (
    <div style={{ color: 'green', marginBottom: '15px' }}>{successMessage}</div>
  )}

  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
    <div>
      <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>
        Username
      </label>
      <input
        type="text"
        id="username"
        value={username}  // Controlled input, value is from state
        onChange={(e) => setUsername(e.target.value)}  // Update state when input changes
        style={{ width: '100%', padding: '8px' }}
        disabled  // Prevent the username from being edited
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

  {/* Delete Account Button */}
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
    {deleting ? 'Deleting...' : 'Delete Account'}
  </button>
</div>

  );
};

export default EditAccount;
