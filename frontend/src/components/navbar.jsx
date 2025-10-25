import React, { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import { useCart } from "./Cartcomponent"; 
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const { cartItems, cartCount, fetchCartFromDatabase } = useCart();

  const { isLoggedIn, logout } = useAuth(); 
  const navigate = useNavigate();

  // Refresh cart when component mounts or when user logs in
  useEffect(() => {
    if (isLoggedIn) {
      fetchCartFromDatabase();
    }
  }, [isLoggedIn]);

  // Handler for the logout button
  const handleLogout = () => {
    logout(navigate);
    // Cart will automatically clear because fetchCartFromDatabase checks for logged in user
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/home">ShreemCraft</Link>
        </div>

        <div className={`navbar-links ${isOpen ? "active" : ""}`}>
          <NavLink to="/home" className="nav-link">Home</NavLink>
          <NavLink to="/products" className="nav-link">Products</NavLink>
          <NavLink to="/about" className="nav-link">About</NavLink>
          <NavLink to="/contact" className="nav-link">Contact</NavLink>
          
          {isLoggedIn ? (
            <button 
              onClick={handleLogout} 
              className="logout-btn"
            >
              Logout
            </button>
          ) : (
            <NavLink to="/login" className="nav-link logout-btn">
              Login
            </NavLink>
          )}
        </div>

        <div className="navbar-icons">
          <div className="icon-wrapper">
            <Link to="/cart" className="cart-link">
              <ShoppingCart size={22} />
              {isLoggedIn && cartCount > 0 && (
                <span className="cart-count">{cartCount}</span>
              )}
            </Link>
          </div>

          <div className="icon-wrapper">
            <Link to="/account" className="account-link" aria-label="My Account">
              <User size={22} />
            </Link>
          </div>

          <button className="menu-toggle" onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
}