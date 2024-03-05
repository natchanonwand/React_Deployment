// ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
  // Adjust this function based on how you handle authentication
  const user = localStorage.getItem('token'); // Example check for authentication
  return !!user;
};

const ProtectedRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
