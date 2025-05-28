import React from 'react';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  isAuthenticated: boolean;
  children: React.ReactElement;
};

export default function PrivateRoute({ isAuthenticated, children }: PrivateRouteProps) {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

