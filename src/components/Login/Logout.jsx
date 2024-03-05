import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user authentication data
    localStorage.removeItem('token'); // Adjust this line according to how you're storing the token or user data
    
    // Optionally, clear other user-related data if needed
    // localStorage.removeItem('user');

    // Redirect to login page or home page after logout
    navigate('/login');
  }, [navigate]);

  // Optionally, provide feedback to the user or a loading spinner while logging out
  return (
    <div>Logging out...</div>
  );
};

export default Logout;
