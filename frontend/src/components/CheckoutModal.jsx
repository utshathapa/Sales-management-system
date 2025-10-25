import React, { useState } from "react";
import "../css/CheckoutModal.css";

export default function CheckoutModal({ isOpen, onClose, onConfirm, totalAmount }) {
  const [shippingAddress, setShippingAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    if (!shippingAddress.trim()) {
      newErrors.shippingAddress = "Shipping address is required";
    }
    
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      onConfirm({
        shipping_address: shippingAddress,
        phone: phone
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Shipping Address *</label>
            <textarea
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              placeholder="Enter your complete shipping address"
              rows="4"
              className={errors.shippingAddress ? "error" : ""}
            />
            {errors.shippingAddress && (
              <span className="error-message">{errors.shippingAddress}</span>
            )}
          </div>

          <div className="form-group">
            <label>Phone Number *</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="9812345678"
              className={errors.phone ? "error" : ""}
            />
            {errors.phone && (
              <span className="error-message">{errors.phone}</span>
            )}
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            <p className="total">Total Amount: Rs. {totalAmount.toFixed(2)}</p>
          </div>

          <div className="modal-buttons">
            <button type="submit" className="confirm-btn">
              Place Order
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}