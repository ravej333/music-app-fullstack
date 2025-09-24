import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // NEW: If the auth state is still loading, show a loading message
  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  // If there is no user and loading is complete, redirect to the login page.
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the user is logged in, render the protected content.
  return children;
};

export default ProtectedRoute;