import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.name) {
    alert("Please login to continue"); // shows popup
    return <Navigate to="/" replace />; // redirects after alert
  }

  return children;
};

export default ProtectedRoute;
