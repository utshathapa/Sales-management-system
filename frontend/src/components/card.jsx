import React, { useState, useEffect } from "react";
import { BsCart2 } from "react-icons/bs";
import "../css/Card.css";
import axios from "axios";
import { useCart } from "../components/Cartcomponent";

export default function Card({ title, image, price, id }) {
    const [warning, setWarning] = useState(false); // State for login warning
    const [isLoading, setIsLoading] = useState(false);
    // NEW STATE: For success/error messages after adding to cart
    const [cartMessage, setCartMessage] = useState({ message: '', type: '' });
    const { fetchCartFromDatabase } = useCart();

    // Effect to clear the cart message after a few seconds
    useEffect(() => {
        if (cartMessage.message) {
            const timer = setTimeout(() => {
                setCartMessage({ message: '', type: '' });
            }, 3000); // Auto-hide after 3s
            return () => clearTimeout(timer);
        }
    }, [cartMessage]);

    const handleAdd = async (e) => {
        e.stopPropagation();

        const userStr = localStorage.getItem("user");

        if (!userStr) {
            setWarning(true); // show warning box for not logged in
            setTimeout(() => setWarning(false), 3000);
            return;
        }

        const user = JSON.parse(userStr);

        if (!user.id) {
            // Replace alert with set state
            setCartMessage({ message: "User session invalid. Please log in again.", type: 'error' });
            return;
        }

        if (!id) {
            console.error("Product ID is missing:", id);
            // Replace alert with set state
            setCartMessage({ message: "Product ID is missing. Cannot add to cart.", type: 'error' });
            return;
        }

        setIsLoading(true);

        try {
            await axios.post(
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

            // Replace alert with set state for success
            setCartMessage({ message: "✅ Product added to cart successfully!", type: 'success' });
        } catch (err) {
            console.error(err);
            // Replace alert with set state for failure
            setCartMessage({ message: "Failed to add to cart. Please try again.", type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    const getMessageStyles = (type) => {
        const baseStyle = {
            marginTop: "10px",
            padding: "8px 12px",
            borderRadius: "6px",
            fontSize: "14px",
            textAlign: "center",
        };

        if (type === 'success') {
            return {
                ...baseStyle,
                backgroundColor: "#e6ffe6", // Light green
                color: "#1d711d", // Dark green text
            };
        }
        if (type === 'error') {
            return {
                ...baseStyle,
                backgroundColor: "#f8d7da", // Light red
                color: "#721c24", // Dark red text
            };
        }
        return baseStyle;
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

                {/* Inline warning box for NO LOGIN */}
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
                
                {/* NEW: Inline message box for cart actions */}
                {cartMessage.message && (
                    <div style={getMessageStyles(cartMessage.type)}>
                        {cartMessage.message}
                    </div>
                )}
            </div>
        </div>
    );
}