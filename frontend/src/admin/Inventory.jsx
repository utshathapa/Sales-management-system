import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Inventory.css";

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingProduct, setEditingProduct] = useState(null); // Product being edited
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/products");
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("❌ Failed to load products.");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
      alert("✅ Product deleted successfully!");
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("❌ Failed to delete product.");
    }
  };

  // Open edit modal
  const handleEditClick = (product) => {
    setEditingProduct(product);
    setEditName(product.name);
    setEditPrice(product.price);
  };

  // Save edits
  const handleEditSave = async () => {
    if (!editName || !editPrice) return alert("Please fill in all fields.");

    try {
      const res = await axios.put(
        `http://localhost:8080/api/products/${editingProduct.id}`,
        { name: editName, price: editPrice }
      );

      // Update product in state
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id ? res.data.product : p
        )
      );

      setEditingProduct(null);
      alert("✅ Product updated successfully!");
    } catch (err) {
      console.error("Error updating product:", err);
      alert("❌ Failed to update product.");
    }
  };

  if (loading) return <p className="message">Loading products...</p>;
  if (error) return <p className="message error">{error}</p>;

  return (
    <div className="inventory-container">
      <h2 className="inventory-title">📦 Product Inventory</h2>
      <p>Total Products: {products.length}</p>

      <div className="table-wrapper">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Added At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  {product.image ? (
                    <img
                      src={`http://localhost:8080/storage/${product.image}`}
                      alt={product.name}
                      className="product-thumbnail"
                    />
                  ) : (
                    <div className="product-placeholder">🖼️</div>
                  )}
                </td>
                <td>{product.name}</td>
                <td>RS.{parseFloat(product.price).toFixed(2)}</td>
                <td>
                  {product.created_at
                    ? new Date(product.created_at).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>
                  <button
                    className="btn btn-edit"
                    onClick={() => handleEditClick(product)}
                    title="Edit Product"
                  >
                    ✏️
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(product.id)}
                    title="Delete Product"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Product</h3>
            <label>
              Name:
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </label>
            <label>
              Price:
              <input
                type="number"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
              />
            </label>
            <div className="modal-actions">
              <button className="btn btn-save" onClick={handleEditSave}>
                Save
              </button>
              <button
                className="btn btn-cancel"
                onClick={() => setEditingProduct(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}