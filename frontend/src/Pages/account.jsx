import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, LogOut, ShoppingBag, Edit, Save, ArrowLeft, X, Smartphone } from 'lucide-react';
import axios from 'axios';
import '../css/MyAccount.css';

/**
 * Account information card component (No change needed)
 */
const InfoCard = ({ icon: Icon, title, value, onEdit, editable = false }) => (
  <div className="info-card">
    <Icon className="card-icon" />
    <div className="info-card-content">
      <div>
        <h4 className="info-card-title">{title}</h4>
        <p className={`info-card-value ${title === 'Password' ? 'password-value' : ''}`}>{value}</p>
      </div>
      {editable && (
        <button 
          onClick={onEdit}
          className="edit-button"
          aria-label={`Edit ${title}`}
        >
          <Edit className="edit-icon" />
        </button>
      )}
    </div>
  </div>
);

/**
 * Custom Modal for editing fields (No change needed)
 */
const EditModal = ({ title, field, currentValue, onClose, onSave }) => {
  const [newValue, setNewValue] = useState(currentValue);
  const [error, setError] = useState('');

  const handleFinalSave = () => {
    if (!newValue.trim()) {
      setError(`${title} cannot be empty.`);
      return;
    }
    onSave(field, newValue); 
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3 className="modal-title">Update {title}</h3>
          <button onClick={onClose} className="modal-close-button">
            <X className="close-icon" />
          </button>
        </div>
        
        <label htmlFor={field} className="modal-label">New {title}</label>
        <input
          id={field}
          type={field === 'password' ? 'password' : 'text'}
          value={newValue}
          onChange={(e) => { setNewValue(e.target.value); setError(''); }}
          className="modal-input"
          placeholder={`Enter new ${title.toLowerCase()}`}
        />
        
        {error && <p className="modal-error">{error}</p>}
        
        <div className="modal-actions">
          <button onClick={onClose} className="modal-cancel-button">
            Cancel
          </button>
          <button onClick={handleFinalSave} className="modal-save-button">
            <Save className="save-icon" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// NEW COMPONENT: OrderHistory 
// ----------------------------------------------------------------------

const OrderHistory = ({ userEmail }) => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedOrder, setExpandedOrder] = useState(null); 

    useEffect(() => {
        if (!userEmail) {
            setError('Authentication error: User email not found.');
            setIsLoading(false);
            return;
        }

        const fetchOrders = async () => {
            try {
                // 1. Get the userId using the userEmail
                const userResponse = await axios.get(`http://127.0.0.1:8080/api/user?email=${userEmail}`);
                const userId = userResponse.data.id; 

                if (!userId) {
                    setError('User ID not found for the current email.');
                    setIsLoading(false);
                    return;
                }

                // 2. Use the userId to fetch the orders (assuming you updated your Laravel to include order_items)
                const ordersResponse = await axios.get(`http://127.0.0.1:8080/api/orders/user/${userId}`);
                
                setOrders(ordersResponse.data.data); 
                setIsLoading(false);

            } catch (err) {
                console.error('Failed to fetch user or orders:', err.response?.data || err);
                setError('Failed to load order history. Backend issue: orders/user/{id}');
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [userEmail]);

    const handleToggleDetails = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    const getStatusClass = (status) => {
      if (!status) return 'status-unknown';
      const lowerStatus = status.toLowerCase();
      if (lowerStatus.includes('completed')) return 'status-completed';
      if (lowerStatus.includes('processing')) return 'status-processing';
      if (lowerStatus.includes('shipped')) return 'status-shipped';
      if (lowerStatus.includes('cancelled')) return 'status-cancelled';
      return 'status-pending';
    }

    if (isLoading) {
        return <p className="loading-text">Loading order history... ⏳</p>;
    }

    if (error) {
        return <p className="error-text">❌ {error}</p>;
    }

    // Order Details Sub-Component
    const OrderDetails = ({ order }) => (
        <div className="order-items-details">
            <div className="shipping-info">
                <strong>Shipping Address:</strong> {order.shipping_address || 'Not Available'}<br/>
                <strong>Contact Phone:</strong> {order.phone || 'Not Available'}
            </div>
            <h4>Items Ordered:</h4>
            {order.order_items && order.order_items.length > 0 ? (
              <table className="order-items-table">
                  <thead>
                      <tr>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Qty</th>
                          <th>Subtotal</th>
                      </tr>
                  </thead>
                  <tbody>
                      {order.order_items.map(item => (
                          <tr key={item.id}>
                              <td className="product-cell">
                                  {/* Placeholder image if not available */}
                                  <img src={item.product_image || 'placeholder.jpg'} alt={item.product_name} className="product-thumb" />
                                  {item.product_name}
                              </td>
                              <td>Rs. {parseFloat(item.product_price).toFixed(2)}</td>
                              <td>{item.quantity}</td>
                              <td>Rs. {parseFloat(item.subtotal).toFixed(2)}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
            ) : (
                <p>No item details found for this order.</p>
            )}
        </div>
    );

    return (
        <div className="order-history">
            <h2 className="content-title">Order History</h2>
            <p className="content-subtitle">
                View the details and status of your past orders.
            </p>

            {orders.length === 0 ? (
                <p className="no-orders">You haven't placed any orders yet. 🛒</p>
            ) : (
                <div className="orders-table-container">
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>Order #</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <React.Fragment key={order.id}>
                                    <tr>
                                        <td>{order.order_number}</td>
                                        <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                        <td className="total-amount">**Rs. {parseFloat(order.total_amount).toFixed(2)}**</td>
                                        <td><span className={`order-status ${getStatusClass(order.status)}`}>{order.status}</span></td>
                                        <td>
                                            <button 
                                                className="view-details-button"
                                                onClick={() => handleToggleDetails(order.id)}
                                            >
                                                {expandedOrder === order.id ? 'Hide' : 'View'}
                                            </button>
                                        </td>
                                    </tr>
                                    {expandedOrder === order.id && (
                                        <tr className="order-details-row">
                                            <td colSpan="5">
                                                <OrderDetails order={order} />
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

// ----------------------------------------------------------------------
// Main Account Dashboard Component
// ----------------------------------------------------------------------
export default function MyAccount() {
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFieldToEdit, setCurrentFieldToEdit] = useState(null);
  const [statusMessage, setStatusMessage] = useState({ message: '', type: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [selectedSection, setSelectedSection] = useState('personal-information'); 

  // --- Data Fetching (Uses stored email to fetch user data) ---
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser || !storedUser.email) { 
      setIsLoggedIn(false);
      return;
    }

    axios.get(`http://127.0.0.1:8080/api/user?email=${storedUser.email}`)
      .then(res => {
        // Map backend response keys (name, email, username, phone) to frontend state keys
        setUserData({
          fullName: res.data.name,
          username: res.data.username,
          email: res.data.email, 
          phone: res.data.phone || 'N/A' // Handle nullable phone field
        });
        setIsLoggedIn(true);
      })
      .catch(err => {
        console.error('Failed to fetch user:', err);
        setIsLoggedIn(false);
      });
  }, []);

  // --- Handle Save (Updates User Data) ---
  const handleSave = async (field, value) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || !storedUser.email) { 
        setStatusMessage({ message: 'Error: User not authenticated.', type: 'error' });
        setIsModalOpen(false);
        return;
    }

    const payload = { email: storedUser.email }; // Old email for API identification
    let updatedLocalStorageData = { ...storedUser };

    if (field === "fullName") {
        payload.name = value; 
        updatedLocalStorageData.name = value; 
    } else if (field === "username") {
        payload.username = value;
    } else if (field === "phone") {
        payload.phone = value;
    } else if (field === "email") {
        payload.new_email = value; 
        updatedLocalStorageData.email = value; 
    } else if (field === "password") {
        payload.password = value;
    }

    try {
      const res = await axios.put('http://127.0.0.1:8080/api/user', payload);
      
      // Update local state and local storage on success
      setUserData(prev => ({ 
        ...prev, 
        [field]: field === 'password' ? prev.password : value,
        // If email was changed, update the primary email key in state
        ...(field === 'email' && { email: value })
      }));
      
      if (field === 'email') {
          localStorage.setItem('user', JSON.stringify({ ...updatedLocalStorageData, email: value }));
      } else {
          localStorage.setItem('user', JSON.stringify(updatedLocalStorageData));
      }


      setIsModalOpen(false);
      setStatusMessage({ message: res.data.message || `${modalDetails.title} updated successfully!`, type: 'success' });
      setTimeout(() => setStatusMessage({ message: '', type: '' }), 3000);

    } catch (err) {
      console.error('Update failed:', err.response?.data || err);
      setIsModalOpen(false); 
      setStatusMessage({ 
        message: err.response?.data?.message || err.response?.data?.errors?.username?.[0] || 'Failed to update account.', 
        type: 'error' 
      });
      setTimeout(() => setStatusMessage({ message: '', type: '' }), 5000);
    }
  };


  const openModal = (field) => {
    setCurrentFieldToEdit(field);
    setIsModalOpen(true);
  };

  const getModalDetails = () => {
    if (!currentFieldToEdit || !userData) return {};
    const titleMap = {
      fullName: 'Full Name',
      username: 'User Name',
      email: 'Email Address',
      phone: 'Phone Number',
      password: 'Password',
    };
    return {
      title: titleMap[currentFieldToEdit],
      currentValue: currentFieldToEdit === 'password' ? '' : userData[currentFieldToEdit],
      field: currentFieldToEdit,
    };
  };

  const modalDetails = getModalDetails();

  // --- Function to render the main content area based on sidebar selection ---
  const renderContent = () => {
    if (!isLoggedIn || !userData) {
      return (
        <p className="login-prompt">
          You are not logged in. Please <a href="/login">log in</a> to access your account.
        </p>
      );
    }

    if (selectedSection === 'personal-information') {
      return (
        <>
          <h2 className="content-title">Personal Information</h2>
          <p className="content-subtitle">
            Manage your personal details, email, and password.
          </p>

          <div className="info-grid">
            <InfoCard 
              icon={User} 
              title="Full Name" 
              value={userData.fullName} 
              onEdit={() => openModal('fullName')}
              editable={true}
            />
            <InfoCard 
              icon={User} 
              title="User Name" 
              value={userData.username} 
              onEdit={() => openModal('username')}
              editable={true}
            />
            <InfoCard 
              icon={Mail} 
              title="Email Address" 
              value={userData.email} 
              onEdit={() => openModal('email')}
              editable={true}
            />
            <InfoCard 
              icon={Smartphone} 
              title="Phone Number" 
              value={userData.phone || 'N/A'} 
              onEdit={() => openModal('phone')}
              editable={true}
            />
            <InfoCard 
              icon={Lock} 
              title="Password" 
              value="********"
              onEdit={() => openModal('password')}
              editable={true}
            />
          </div>
        </>
      );
    } else if (selectedSection === 'order-history') {
      return <OrderHistory userEmail={userData.email} />;
    }
  };

  return (
    <div className="account-container">
      {/* Header */}
      <header className="account-header">
        <div className="header-back"
          onClick={() => {
            window.location.replace("/home"); 
          }}>
          <ArrowLeft className="back-icon" />
          <span className="back-text">Back to home</span>
        </div>
        <button
          className="signout-button"
          onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("authToken");
            window.location.replace("/"); 
          }}
        >
          <LogOut className="signout-icon" />
          Sign out
        </button>
      </header>

      {/* Main Content */}
      <div className="main-content">
        <h1 className="page-title">
          <span className="title-accent">My</span> Account
        </h1>

        {statusMessage.message && (
          <div className={`status-message ${statusMessage.type === 'success' ? 'status-success' : 'status-error'}`}>
            {statusMessage.message}
          </div>
        )}

        <div className="account-layout">
          {/* Sidebar */}
          <aside className="sidebar">
            <div className="profile-summary">
              <div className="profile-avatar">
                <User size={40} />
              </div>
              <h2 className="profile-name">{isLoggedIn && userData ? userData.fullName : "Guest"}</h2>
              <p className="profile-email">{isLoggedIn && userData ? userData.email : "Please log in"}</p>
            </div>

            <nav className="sidebar-nav">
              {[ 
                { id: 'personal-information', name: 'Personal Information', icon: User },
                { id: 'order-history', name: 'Order History', icon: ShoppingBag }
              ].map(item => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedSection(item.id)}
                    className={`nav-link ${item.id === selectedSection ? 'nav-link-active' : ''}`}
                  >
                    <IconComponent className="nav-icon" />
                    {item.name}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Right Content */}
          <div className="content-area">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <EditModal 
          title={modalDetails.title}
          field={modalDetails.field}
          currentValue={modalDetails.currentValue}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}