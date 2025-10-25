import React, { useEffect, useState } from "react";
import axios from "axios";
import { Users, Search, Mail, Calendar, Trash2, Eye } from "lucide-react";
import "../css/CustomersTable.css";

export default function Customer() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get("http://127.0.0.1:8080/api/admin/customers");
      console.log("Customers response:", response.data);
      
      const customerData = response.data.data || response.data.customers || response.data || [];
      setCustomers(Array.isArray(customerData) ? customerData : []);
      
    } catch (err) {
      console.error("Failed to fetch customers:", err);
      setError(err.response?.data?.message || "Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (customerId) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) {
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:8080/api/admin/customers/${customerId}`);
      alert("Customer deleted successfully!");
      fetchCustomers();
    } catch (err) {
      console.error("Delete failed:", err);
      alert(err.response?.data?.message || "Failed to delete customer");
    }
  };

  const handleViewDetails = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="customers-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading customers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="customers-container">
        <div className="error-state">
          <h3>❌ Error</h3>
          <p>{error}</p>
          <button onClick={fetchCustomers} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="customers-container">
      <div className="customers-header">
        <div className="header-title">
          <Users size={28} />
          <h2>Customer Management</h2>
        </div>
        <div className="header-stats">
          <span className="stat-badge">
            Total Customers: <strong>{customers.length}</strong>
          </span>
        </div>
      </div>

      <div className="customers-controls">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button onClick={fetchCustomers} className="refresh-btn">
          🔄 Refresh
        </button>
      </div>

      {filteredCustomers.length === 0 ? (
        <div className="empty-state">
          <Users size={48} color="#ccc" />
          <p>No customers found</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="customers-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Joined Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>#{customer.id}</td>
                  <td>
                    <div className="customer-name">
                      <div className="avatar">
                        {customer.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                      {customer.name || "N/A"}
                    </div>
                  </td>
                  <td>
                    <div className="email-cell">
                      <Mail size={14} />
                      {customer.email}
                    </div>
                  </td>
                  <td>{customer.phone || "N/A"}</td>
                  <td>
                    <span className={`role-badge ${customer.role}`}>
                      {customer.role || "user"}
                    </span>
                  </td>
                  <td>
                    <div className="date-cell">
                      <Calendar size={14} />
                      {customer.created_at
                        ? new Date(customer.created_at).toLocaleDateString()
                        : "N/A"}
                    </div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-view"
                        onClick={() => handleViewDetails(customer)}
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(customer.id)}
                        title="Delete Customer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Customer Details Modal */}
      {showModal && selectedCustomer && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Customer Details</h3>
              <button
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <strong>ID:</strong>
                <span>#{selectedCustomer.id}</span>
              </div>
              <div className="detail-row">
                <strong>Name:</strong>
                <span>{selectedCustomer.name || "N/A"}</span>
              </div>
              <div className="detail-row">
                <strong>Email:</strong>
                <span>{selectedCustomer.email}</span>
              </div>
              <div className="detail-row">
                <strong>Phone:</strong>
                <span>{selectedCustomer.phone || "N/A"}</span>
              </div>
              <div className="detail-row">
                <strong>Role:</strong>
                <span className={`role-badge ${selectedCustomer.role}`}>
                  {selectedCustomer.role || "user"}
                </span>
              </div>
              <div className="detail-row">
                <strong>Account Created:</strong>
                <span>
                  {selectedCustomer.created_at
                    ? new Date(selectedCustomer.created_at).toLocaleString()
                    : "N/A"}
                </span>
              </div>
              {selectedCustomer.updated_at && (
                <div className="detail-row">
                  <strong>Last Updated:</strong>
                  <span>
                    {new Date(selectedCustomer.updated_at).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                className="modal-close-btn"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}