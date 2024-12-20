import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// PrivateRoute component checks if the user is authenticated
const PrivateRoute: React.FC = () => {
  const token = localStorage.getItem("token");

  // If no token, redirect to login page
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
