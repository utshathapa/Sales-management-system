import React, { useState } from "react";
import { BsCart2 } from "react-icons/bs";
import "../css/Card.css";
import axios from "axios";
import { useCart } from "../components/Cartcomponent";

export default function Card({ title, image, price, id }) {
  const [warning, setWarning] = useState(false); // new state for warning box
  const [isLoading, setIsLoading] = useState(false);
  const { fetchCartFromDatabase } = useCart();

  const handleAdd = async (e) => {
    e.stopPropagation();

    const userStr = localStorage.getItem("user");

    if (!userStr) {
      setWarning(true); // show warning box
      setTimeout(() => setWarning(false), 3000); // auto-hide after 3s
      return;
    }

    const user = JSON.parse(userStr);

    if (!user.id) {
      alert("User session invalid. Please log in again.");
      return;
    }

    if (!id) {
      console.error("Product ID is missing:", id);
      alert("Product ID is missing. Cannot add to cart.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/api/cart/add",
        {
          product_id: parseInt(id),
          product_name: title,
          product_image: image,
          product_price: parseFloat(price),
          user_id: parseInt(user.id),
          quantity: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (fetchCartFromDatabase) {
        await fetchCartFromDatabase();
      }

      alert("✅ Product added to cart successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card" style={{ position: "relative" }}>
      <img src={image} alt={title} className="card-image" />
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-price">Rs. {price}</p>
        <button
          className="card-btn"
          onClick={handleAdd}
          disabled={isLoading}
        >
          <BsCart2 size={18} style={{ marginRight: "6px" }} />
          {isLoading ? "Adding..." : "Add to Cart"}
        </button>

        {/* Inline warning box */}
        {warning && (
          <div
            style={{
              marginTop: "10px",
              padding: "8px 12px",
              backgroundColor: "#ffe6f7",
              color: "#a64ca6",
              borderRadius: "6px",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            ⚠️ You are not logged in! Please login first.
          </div>
        )}
      </div>
    </div>
  );
}
