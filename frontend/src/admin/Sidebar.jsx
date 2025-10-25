import React, { useState } from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  // Settings, // Not used in this code block
  ChevronRight,
  Package,
  FileText,
  LogOut,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/AdminPanel.css";
import { useAuth } from "../hooks/useAuth";

export default function Sidebar({ isCollapsed, toggleSidebar }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [openMenus, setOpenMenus] = useState({});

  // Handle submenu toggles
  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const isActive = (path) => location.pathname === path;

  // Logout handler
  const handleLogout = async () => {
    await logout(navigate);
  };

  return (
    <aside className={`admin-sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span className="logo-admin">Admin</span>{" "}
          <span className="logo-panel">Panel</span>
        </div>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          ☰
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className="sidebar-nav">
        {/* Dashboard */}
        <Link
          to="/admin/dashboard"
          className={`nav-item ${isActive("/admin/dashboard") ? "nav-item-active" : ""}`}
        >
          <LayoutDashboard className="nav-item-icon" />
          <span>Dashboard</span>
        </Link>

        {/* Products */}
        <div className="nav-group">
          <div
            className="nav-item has-submenu"
            onClick={() => toggleMenu("products")}
          >
            <div className="flex items-center">
              <ShoppingBag className="nav-item-icon" />
              <span>Products</span>
            </div>
            <ChevronRight
              className={`submenu-arrow ${openMenus.products ? "expanded" : ""}`}
            />
          </div>

          {openMenus.products && (
            <div className="submenu">
              <Link
                to="/admin/product"
                className={`nav-sub-item ${isActive("/admin/product") ? "nav-item-active" : ""}`}
              >
                <Package className="nav-sub-item-icon" />
                <span>Add New Product</span>
              </Link>
              <Link
                to="/admin/inventory"
                className={`nav-sub-item ${isActive("/admin/inventory") ? "nav-item-active" : ""}`}
              >
                <FileText className="nav-sub-item-icon" />
                <span>Inventory</span>
              </Link>
            </div>
          )}
        </div>

        {/* Orders - UPDATED LINKS */}
        <div className="nav-group">
          <div
            className="nav-item has-submenu"
            onClick={() => toggleMenu("orders")}
          >
            <div className="flex items-center">
              <FileText className="nav-item-icon" />
              <span>Orders</span>
            </div>
            <ChevronRight
              className={`submenu-arrow ${openMenus.orders ? "expanded" : ""}`}
            />
          </div>

          {openMenus.orders && (
            <div className="submenu">
              <Link
                // ROUTE ADJUSTED: /admin/new-orders (lowercase and hyphenated)
                to="/admin/new-orders" 
                className={`nav-sub-item ${isActive("/admin/new-orders") ? "nav-item-active" : ""}`}
              >
                <span>New Orders</span>
              </Link>
              <Link
                // ROUTE ADJUSTED: /admin/order-history (lowercase and hyphenated)
                to="/admin/order-history"
                className={`nav-sub-item ${isActive("/admin/order-history") ? "nav-item-active" : ""}`}
              >
                <span>Order History</span>
              </Link>
            </div>
          )}
        </div>

        {/* Customers */}
        <div className="nav-group">
          <div
            className="nav-item has-submenu"
            onClick={() => toggleMenu("customers")}
          >
            <div className="flex items-center">
              <Users className="nav-item-icon" />
              <span>Customers</span>
            </div>
            <ChevronRight
              className={`submenu-arrow ${openMenus.customers ? "expanded" : ""}`}
            />
          </div>

          {openMenus.customers && (
            <div className="submenu">
              <Link
                to="/admin/customer"
                className={`nav-sub-item ${isActive("/admin/customer") ? "nav-item-active" : ""}`}
              >
                <span>Segments</span>
              </Link>
            </div>
          )}
        </div>

        {/* Logout Button at Bottom */}
        <button onClick={handleLogout} className="nav-item logout-btn">
          <LogOut className="nav-item-icon" />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
}