import React, { useEffect, useState } from "react";
import { useCart } from "../components/Cartcomponent";
import { useNavigate } from "react-router-dom";
import CheckoutModal from "../components/CheckoutModal";
import axios from "axios";
import "../css/CartPage.css";
import { useTheme } from "../hooks/useTheme"; // ✅ Import the theme hook

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, isLoading, fetchCartFromDatabase } = useCart();
  const [user, setUser] = useState(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const navigate = useNavigate();

  const { theme } = useTheme(); // ✅ Access the current theme

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const parsedUser = JSON.parse(userStr);
      setUser(parsedUser);
      fetchCartFromDatabase();
    } else {
      setUser(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleBuyNow = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    setCheckoutModalOpen(true);
  };

  const handleConfirmOrder = async (checkoutData) => {
    setIsPlacingOrder(true);
    try {
      const response = await axios.post('http://127.0.0.1:8080/api/orders', {
        user_id: user.id,
        shipping_address: checkoutData.shipping_address,
        phone: checkoutData.phone
      });

      const order = response.data.data;

      if (order && order.order_number) {
        alert(`✅ Order placed successfully! Order Number: ${order.order_number}`);
        setCheckoutModalOpen(false);
        await fetchCartFromDatabase();
      } else {
        alert('✅ Order placed successfully, but order number is unavailable.');
        setCheckoutModalOpen(false);
        await fetchCartFromDatabase();
      }
    } catch (error) {
      console.error('Order creation failed:', error);
      const errorMessage = error.response?.data?.message || 'Failed to place order. Please try again.';
      alert(`❌ Failed to place order. ${errorMessage}`);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  // Loading or login state wrapper
  const renderContent = () => {
    if (!user) {
      return (
        <div className="login-prompt">
          <h2>🔒 Login Required</h2>
          <p>Please log in to view your shopping cart.</p>
          <button className="login-btn" onClick={() => navigate('/login')}>Go to Login</button>
        </div>
      );
    }

    if (isLoading) {
      return <p style={{ textAlign: 'center', padding: '40px' }}>Loading your cart...</p>;
    }

    if (cartItems.length === 0) {
      return (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p className="empty-cart">Your cart is empty 😢</p>
          <button onClick={() => navigate('/products')}>Browse Products</button>
        </div>
      );
    }

    return (
      <>
        <ul className="cart-list">
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              <img
                src={item.image}
                alt={item.title}
                className="cart-image"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150?text=No+Image'; }}
              />
              <div className="cart-details">
                <h4>{item.title}</h4>
                <p className="price">Rs. {item.price}</p>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.title, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.title, item.quantity + 1)}>+</button>
                </div>
              </div>
              <div className="cart-actions">
                <p className="subtotal">Subtotal: Rs. {(item.price * item.quantity).toFixed(2)}</p>
                <button className="remove-btn" onClick={() => removeFromCart(item.title)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>

        <div className="cart-summary">
          <h3>Cart Summary</h3>
          <p>Total Items: {totalItems}</p>
          <p className="cart-total">Total: Rs. {total.toFixed(2)}</p>
          <div className="cart-buttons">
            <button className="buy-now-btn" onClick={handleBuyNow} disabled={isPlacingOrder}>
              {isPlacingOrder ? 'Processing...' : 'Buy Now'}
            </button>
            <button className="clear-btn" onClick={() => {
              if (window.confirm('Are you sure you want to clear your cart?')) clearCart();
            }}>Clear Cart</button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className={theme === 'dark' ? 'dark-mode' : ''} style={{ minHeight: '100vh', padding: '30px 0', backgroundColor: theme === 'dark' ? '#000' : '#faf7ff' }}>
  <div className="cart-page">
    <h2 className="cart-title">🛒 Your Shopping Cart</h2>
    <p style={{ fontSize: '14px', color: theme === 'dark' ? '#ccc' : '#666', marginBottom: '20px', textAlign: 'center' }}>
      Logged in as: <strong>{user?.name || user?.email}</strong>
    </p>
    {renderContent()}
  </div>

  <CheckoutModal
    isOpen={checkoutModalOpen}
    onClose={() => setCheckoutModalOpen(false)}
    onConfirm={handleConfirmOrder}
    totalAmount={total}
  />
</div>);
}