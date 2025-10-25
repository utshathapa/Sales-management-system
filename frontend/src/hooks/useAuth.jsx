import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { setAuthToken } from '../axiosConfig';

// 1. Create the Context
const AuthContext = createContext(null);

// Initial state function
const getInitialAuthState = () => {
  const token = localStorage.getItem("auth_token");
  const userString = localStorage.getItem("user");
  
  if (token && userString) {
    setAuthToken(token); 
    try {
        return { isLoggedIn: true, user: JSON.parse(userString) };
    } catch (e) {
        localStorage.clear(); 
        setAuthToken(null);
        return { isLoggedIn: false, user: null };
    }
  }
  return { isLoggedIn: false, user: null };
};

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(getInitialAuthState);

  const login = (token, user) => {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setAuthToken(token);
    setAuthState({ isLoggedIn: true, user: user });
  };

  const logout = async (navigate) => {
    try {
      await axios.post("http://127.0.0.1:8080/api/logout");
    } catch (error) {
      console.error("Logout API call failed, proceeding with client-side cleanup:", error);
    }

    // Clear all localStorage
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    setAuthToken(null);
    
    // Update auth state
    setAuthState({ isLoggedIn: false, user: null });
    
    // Navigate to login
    if (navigate) {
      navigate("/login");
    }
    
    // Reload page to clear all React state (including cart)
    // This ensures cart badge and cart items are completely cleared
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  // 3. Provide the context value
  const contextValue = { 
    isLoggedIn: authState.isLoggedIn, 
    user: authState.user, 
    login, 
    logout 
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. Create a custom hook to consume the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};