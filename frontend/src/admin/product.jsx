import React, { useState } from "react";
import axios from "axios";

// --- START: Embedded CSS Styles ---
const styles = `
    /* Define color variables for easy theming */
    :root {
        --purple-primary: #6B46C1;
        --purple-hover: #5A40A7;
        --purple-light: #EDE9FE;
        --shadow-color: rgba(107, 70, 193, 0.2);
        --text-primary: #4A4A4A;
        --success-bg: #E6FFFA;
        --success-text: #3182CE;
        --error-bg: #FFF5F5;
        --error-text: #E53E3E;
        font-family: 'Inter', sans-serif; /* Apply font globally for the component */
    }

    /* Main Container Styling */
    .product-container {
        padding: 2rem;
        max-width: 500px;
        margin: 3rem auto;
        background-color: #ffffff;
        border-radius: 12px;
        /* Custom shadow effect */
        box-shadow: 0 15px 30px var(--shadow-color), 0 5px 15px rgba(0, 0, 0, 0.05);
        border: 1px solid var(--purple-light);
    }

    /* Header */
    .header-title {
        font-size: 2rem;
        font-weight: 800;
        margin-bottom: 1.5rem;
        text-align: center;
        color: var(--purple-primary);
    }

    /* Form Groups and Labels */
    .form-group {
        margin-bottom: 1rem;
    }

    .form-label {
        display: block;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: var(--purple-primary);
    }

    /* Input Fields */
    .form-input {
        width: 100%;
        border: 1px solid #d1d5db;
        padding: 0.75rem;
        border-radius: 8px;
        transition: all 0.3s ease;
        box-sizing: border-box;
    }

    .form-input:focus {
        outline: none;
        border-color: var(--purple-primary);
        box-shadow: 0 0 0 3px var(--purple-light);
    }

    /* File Input Custom Styling */
    .file-input {
        width: 100%;
        padding: 0.75rem 0;
        color: var(--text-primary);
    }

    .file-input::file-selector-button {
        background-color: var(--purple-light);
        color: var(--purple-primary);
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 9999px;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        margin-right: 1rem;
        transition: background-color 0.2s;
    }

    .file-input::file-selector-button:hover {
        background-color: #e0d9fa;
    }

    /* Submit Button */
    .submit-button {
        width: 100%;
        background-color: var(--purple-primary);
        color: white;
        font-weight: bold;
        padding: 0.75rem 1rem;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        margin-top: 1.5rem;
        transition: all 0.3s ease;
        box-shadow: 0 4px 6px rgba(107, 70, 193, 0.4);
    }

    .submit-button:hover {
        background-color: var(--purple-hover);
        transform: translateY(-1px);
        box-shadow: 0 6px 8px rgba(107, 70, 193, 0.5);
    }

    .submit-button:active {
        transform: translateY(0);
    }

    /* Status Messages */
    .status-message {
        text-align: center;
        margin-bottom: 1rem;
        padding: 0.75rem;
        border-radius: 8px;
        font-weight: 500;
    }

    .status-message.success {
        background-color: var(--success-bg);
        color: var(--success-text);
        border: 1px solid #B2F5EA;
    }

    .status-message.error {
        background-color: var(--error-bg);
        color: var(--error-text);
        border: 1px solid #FED7D7;
    }
`;
// --- END: Embedded CSS Styles ---

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    if (image) formData.append("image", image);

    try {
      await axios.post("http://localhost:8080/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("✅ Product added successfully!");
      setName("");
      setPrice("");
      setImage(null);
    } catch (error) {
      console.error("Error submitting product:", error);
      // Added error handling for network issues
      if (error.code === 'ERR_NETWORK') {
        setMessage("❌ Network error: Could not connect to the API server (http://localhost:8080).");
      } else {
        setMessage("❌ Error adding product.");
      }
    }
  };

  return (
    <>
      {/* Injecting CSS styles into the DOM */}
      <style>{styles}</style>
      
      <div className="product-container">
        <h2 className="header-title">
          Add New Product 🛍️
        </h2>
        
        {message && (
          <p className={`status-message ${message.includes('success') ? 'success' : 'error'}`}>
            {message}
          </p>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Price (RS.)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="form-input"
              placeholder="Enter price"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="file-input"
            />
          </div>

          <button
            type="submit"
            className="submit-button"
          >
            Add Product
          </button>
        </form>
      </div>
    </>
  );
}