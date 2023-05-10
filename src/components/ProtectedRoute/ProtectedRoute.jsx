import React from 'react';
import { Navigate, Outlet, Route } from 'react-router-dom';

export const ProtectedRoute = ({ children, ...rest }) => {
  const isAuthenticated = localStorage.getItem('jwt') !== null

  return isAuthenticated ? (
    <></>
  ) : (
    <Navigate to="/login" replace />
  )
};