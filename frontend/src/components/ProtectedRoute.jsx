import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.name) {
    // If no user is logged in, redirect to landing page
    return <Navigate to="/" replace />;
  }

  // If user is logged in, render the children
  return children;
};

export default ProtectedRoute;