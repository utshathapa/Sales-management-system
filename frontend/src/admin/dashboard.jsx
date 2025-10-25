import React, { useEffect, useState } from "react";
import "../css/AdminPanel.css";
import axios from "axios";
import { Users, DollarSign, MessageCircle } from "lucide-react";

export default function Dashboard() {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('=== FETCHING DASHBOARD DATA ===');

        // Fetch customers
        const usersRes = await axios.get("http://127.0.0.1:8080/api/admin/total-customers");
        console.log('Customers Response:', usersRes.data);
        const customerCount = usersRes.data.count || 0;
        setTotalCustomers(customerCount);

        // Fetch sales
        const salesRes = await axios.get("http://127.0.0.1:8080/api/admin/total-sales");
        console.log('Sales Response:', salesRes.data);
        const salesTotal = salesRes.data.total || 0;
        setTotalSales(salesTotal);

        // Fetch messages
        try {
          const messagesRes = await axios.get("http://127.0.0.1:8080/api/admin/messages");
          console.log('Messages Response:', messagesRes.data);
          // Handle both array and object response formats
          const messageData = Array.isArray(messagesRes.data) ? messagesRes.data : (messagesRes.data.data || []);
          setMessages(messageData);
        } catch (msgError) {
          console.warn('Messages endpoint error:', msgError.message);
          setMessages([]);
        }

        console.log('=== DASHBOARD DATA LOADED ===');
        console.log('Total Customers:', customerCount);
        console.log('Total Sales:', salesTotal);

      } catch (error) {
        console.error("=== DASHBOARD ERROR ===");
        console.error("Full error:", error);
        
        if (error.response) {
          console.error("Error status:", error.response.status);
          console.error("Error data:", error.response.data);
          setError(`Server error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
        } else if (error.request) {
          console.error("No response received");
          setError("Cannot connect to server. Make sure backend is running on http://127.0.0.1:8080");
        } else {
          console.error("Error:", error.message);
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="admin-panel-container">
        <header className="admin-header">
          <h2>Admin Dashboard</h2>
        </header>
        <main className="dashboard-content">
          <p style={{ textAlign: 'center', padding: '40px' }}>Loading dashboard data...</p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-panel-container">
        <header className="admin-header">
          <h2>Admin Dashboard</h2>
        </header>
        <main className="dashboard-content">
          <div style={{ 
            backgroundColor: '#f8d7da', 
            color: '#721c24', 
            padding: '20px', 
            borderRadius: '8px',
            border: '1px solid #f5c6cb'
          }}>
            <h3>❌ Error Loading Dashboard</h3>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              style={{
                marginTop: '10px',
                padding: '8px 16px',
                backgroundColor: '#721c24',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="admin-panel-container">
      <header className="admin-header">
        <h2>Admin Dashboard</h2>
      </header>

      <main className="dashboard-content">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="icon-wrapper users">
              <Users size={32} />
            </div>
            <div>
              <h4>Total Customers</h4>
              <p>{totalCustomers}</p>
              {totalCustomers === 0 && (
                <small style={{ color: '#999', fontSize: '12px' }}>
                  No users with role='user' found
                </small>
              )}
            </div>
          </div>

          <div className="stat-card">
            <div className="icon-wrapper sales">
              <DollarSign size={32} />
            </div>
            <div>
              <h4>Total Sales</h4>
              <p>Rs. {totalSales.toLocaleString()}</p>
              {totalSales === 0 && (
                <small style={{ color: '#999', fontSize: '12px' }}>
                  No completed orders found
                </small>
              )}
            </div>
          </div>
        </div>

        <div className="messages-section">
          <h3>
            <MessageCircle size={20} /> User Messages
          </h3>
          {messages.length > 0 ? (
            <ul>
              {messages.map((msg, i) => (
                <li key={i}>
                  <strong>{msg.name || "Anonymous"}:</strong> {msg.message}
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-messages">No messages found.</p>
          )}
        </div>
      </main>
    </div>
  );
}