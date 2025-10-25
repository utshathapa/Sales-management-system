import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import axios from "axios";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCartFromDatabase = useCallback(async () => {
    const userStr = localStorage.getItem("user");
    
    if (!userStr) {
      setCartItems([]);
      return;
    }

    const user = JSON.parse(userStr);
    
    if (!user.id) {
      setCartItems([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8080/api/cart?user_id=${user.id}`
      );
      
      console.log("Raw cart response:", response.data);
      
      // Check if response has the expected structure
      if (!response.data.success || !response.data.data) {
        console.error("Unexpected response format:", response.data);
        setCartItems([]);
        return;
      }

      // Transform database response - product details are now directly in cart item
      const formattedCart = response.data.data.map(item => ({
        id: item.id,
        title: item.product_name,
        price: parseFloat(item.product_price),
        image: item.product_image,
        quantity: item.quantity,
        product_id: item.product_id
      }));
      
      setCartItems(formattedCart);
      console.log("Cart loaded from database:", formattedCart);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      console.error("Error response:", err.response?.data);
      setCartItems([]);
    } finally {
      setIsLoading(false);
    }
  }, []); // Empty dependency array

  // Fetch cart items from database when component mounts
  useEffect(() => {
    fetchCartFromDatabase();
  }, [fetchCartFromDatabase]);

  const addToCart = (product) => {
    // This is for manual adding (if needed)
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.title === product.title);
      if (existingItem) {
        return prev.map((item) =>
          item.title === product.title
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = async (title) => {
    const userStr = localStorage.getItem("user");
    
    if (!userStr) {
      alert("Please login to manage your cart");
      return;
    }

    const itemToRemove = cartItems.find(item => item.title === title);
    
    if (itemToRemove && itemToRemove.id) {
      try {
        const response = await axios.delete(`http://127.0.0.1:8080/api/cart/${itemToRemove.id}`);
        console.log("Item removed from database:", response.data);
        
        // Update local state
        setCartItems((prev) => prev.filter((item) => item.title !== title));
      } catch (err) {
        console.error("Failed to remove from database:", err);
        console.error("Error response:", err.response?.data);
        alert("Failed to remove item from cart");
      }
    }
  };

  const updateQuantity = async (title, quantity) => {
    const userStr = localStorage.getItem("user");
    
    if (!userStr) {
      alert("Please login to manage your cart");
      return;
    }

    // Don't allow quantity less than 1
    if (quantity < 1) {
      return;
    }

    const itemToUpdate = cartItems.find(item => item.title === title);
    
    if (itemToUpdate && itemToUpdate.id) {
      try {
        const response = await axios.put(`http://127.0.0.1:8080/api/cart/${itemToUpdate.id}`, {
          quantity: quantity
        });
        console.log("Quantity updated in database:", response.data);
        
        // Update local state
        setCartItems((prev) =>
          prev.map((item) =>
            item.title === title ? { ...item, quantity: quantity } : item
          )
        );
      } catch (err) {
        console.error("Failed to update quantity:", err);
        console.error("Error response:", err.response?.data);
        alert("Failed to update quantity");
      }
    }
  };

  const clearCart = async () => {
    const userStr = localStorage.getItem("user");
    
    if (!userStr) {
      alert("Please login to manage your cart");
      return;
    }

    const user = JSON.parse(userStr);

    try {
      const response = await axios.delete(`http://127.0.0.1:8080/api/cart?user_id=${user.id}`);
      console.log("Cart cleared from database:", response.data);
      setCartItems([]);
    } catch (err) {
      console.error("Failed to clear cart:", err);
      console.error("Error response:", err.response?.data);
      alert("Failed to clear cart");
    }
  };

  // Calculate total cart count
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart,
        isLoading,
        fetchCartFromDatabase,
        cartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};