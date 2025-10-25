import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import React, { useState } from "react";
import Navbar from "./components/navbar";
import LandingPage from "./Pages/LandingPage";
import SignUp from "./Pages/signup";
import Login from "./Pages/login";
import Home from "./components/Home";
import Contact from "./Pages/contact";
import About from "./Pages/About";
import { CartProvider } from "./components/Cartcomponent";
import CartPage from "./Pages/CartPage";
import Products from "./Pages/product";
import Account from "./Pages/account";
import Admindashboard from "./admin/dashboard";
import Product from "./admin/product";
import Inventory from "./admin/Inventory";
import Sidebar from "./admin/Sidebar";
import NewOrders from "./admin/NewOrders";        // <-- IMPORT NEW ORDERS
import OrderHistory from "./admin/OrderHistory";  // <-- IMPORT ORDER HISTORY
import Customer from "./admin/Customer";  // Add this line
import "./axiosConfig";

// --- Layout wrappers ---
const AdminLayout = ({ children, isCollapsed, toggleSidebar }) => (
  <div style={{ display: "flex", minHeight: "100vh" }}>
    <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
    <div
      style={{
        flex: 1,
        padding: "20px",
        marginLeft: !isCollapsed ? "250px" : "80px",
        transition: "margin-left 0.3s ease",
      }}
    >
      {children}
    </div>
  </div>
);

const UserLayout = ({ children }) => (
  <div>
    <Navbar />
    <div style={{ paddingTop: "20px" }}>{children}</div>
  </div>
);

function AppContent() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // const isAdminPage = location.pathname.startsWith("/admin"); // Not used but useful for context

  return (
    <Routes>
      {/* --- User routes --- */}
      <Route
        path="/"
        element={<UserLayout><LandingPage /></UserLayout>}
      />
      <Route
        path="/signup"
        element={<UserLayout><SignUp /></UserLayout>}
      />
      <Route
        path="/login"
        element={<UserLayout><Login /></UserLayout>}
      />
      <Route
        path="/home"
        element={<UserLayout><Home /></UserLayout>}
      />
      <Route
        path="/products"
        element={<UserLayout><Products /></UserLayout>}
      />
      <Route
        path="/contact"
        element={<UserLayout><Contact /></UserLayout>}
      />
      <Route
        path="/about"
        element={<UserLayout><About /></UserLayout>}
      />
      <Route
        path="/cart"
        element={<UserLayout><CartPage /></UserLayout>}
      />
      <Route
        path="/account"
        element={<UserLayout><Account /></UserLayout>}
      />

      {/* --------------------------- --- Admin routes --- --------------------------- */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminLayout isCollapsed={isCollapsed} toggleSidebar={() => setIsCollapsed(!isCollapsed)}>
            <Admindashboard />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/product"
        element={
          <AdminLayout isCollapsed={isCollapsed} toggleSidebar={() => setIsCollapsed(!isCollapsed)}>
            <Product />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/inventory"
        element={
          <AdminLayout isCollapsed={isCollapsed} toggleSidebar={() => setIsCollapsed(!isCollapsed)}>
            <Inventory />
          </AdminLayout>
        }
      />
      
      {/* --- NEW ORDER ROUTES --- */}
      <Route
        path="/admin/new-orders"
        element={
          <AdminLayout isCollapsed={isCollapsed} toggleSidebar={() => setIsCollapsed(!isCollapsed)}>
            <NewOrders />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/order-history"
        element={
          <AdminLayout isCollapsed={isCollapsed} toggleSidebar={() => setIsCollapsed(!isCollapsed)}>
            <OrderHistory />
          </AdminLayout>
        }
      />
      {/* --- Customer route --- */}
<Route
  path="/admin/customer"
  element={
    <AdminLayout isCollapsed={isCollapsed} toggleSidebar={() => setIsCollapsed(!isCollapsed)}>
      <Customer />
    </AdminLayout>
  }
/>
      
      {/* ---------------------------------------------------------------------------- */}
    </Routes>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;