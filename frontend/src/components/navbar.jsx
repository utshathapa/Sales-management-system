import React, { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, User, Sun, Moon } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import { useCart } from "./Cartcomponent";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme"; // 👈 import theme hook

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const { cartCount, fetchCartFromDatabase } = useCart();
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  // 🌙 Theme
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (isLoggedIn) fetchCartFromDatabase();
  }, [isLoggedIn]);

  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <nav className={`navbar ${theme === "dark" ? "navbar-dark" : "navbar-light"}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/home">ShreemCraft</Link>
        </div>

        {/* Links */}
        <div className={`navbar-links ${isOpen ? "active" : ""}`}>
          <NavLink to="/home" className="nav-link">Home</NavLink>
          <NavLink to="/products" className="nav-link">Products</NavLink>
          <NavLink to="/about" className="nav-link">About</NavLink>
          <NavLink to="/contact" className="nav-link">Contact</NavLink>

          {isLoggedIn ? (
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          ) : (
            <NavLink to="/login" className="nav-link logout-btn">Login</NavLink>
          )}
        </div>

        {/* Icons */}
        <div className="navbar-icons">
          {/* Cart */}
          <div className="icon-wrapper">
            <Link to="/cart" className="cart-link">
              <ShoppingCart size={22} />
              {isLoggedIn && cartCount > 0 && (
                <span className="cart-count">{cartCount}</span>
              )}
            </Link>
          </div>

          {/* Account */}
          <div className="icon-wrapper">
            <Link to="/account" className="account-link" aria-label="My Account">
              <User size={22} />
            </Link>
          </div>

          {/* 🌙 Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <Moon size={22} /> : <Sun size={22} />}
          </button>

          {/* Menu toggle for mobile */}
          <button className="menu-toggle" onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
}