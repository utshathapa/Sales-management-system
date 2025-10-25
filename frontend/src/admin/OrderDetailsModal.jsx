import React from 'react';
import { X, User, MapPin, Package, Phone, Calendar, Clock } from 'lucide-react';
import '../css/OrderDetailsModal.css';

const OrderDetailsModal = ({ order, onClose, onStatusUpdate }) => {
    if (!order) return null;

    // Helper function to format currency
    const formatCurrency = (amount) => {
        return `Rs. ${parseFloat(amount).toFixed(2)}`;
    };

    // Helper function to format date/time
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit', minute: '2-digit', hour12: true
        });
    };

    const getStatusClass = (status) => {
        const statusClasses = {
            pending: 'status-pending',
            processing: 'status-processing',
            completed: 'status-completed',
            cancelled: 'status-cancelled'
        };
        return statusClasses[status] || 'status-default';
    };

    return (
        <div className="order-modal-overlay" onClick={onClose}>
            <div className="order-modal-container" onClick={(e) => e.stopPropagation()}>
                {/* Modal Header */}
                <div className="order-modal-header">
                    <h2 className="order-modal-title">
                        Order Details: <span className="order-number-highlight">#{order.order_number}</span>
                    </h2>
                    <button onClick={onClose} className="order-modal-close">
                        <X size={24} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="order-modal-body">
                    {/* Left Column: Order Info */}
                    <div className="order-info-column">
                        {/* Status & Timing */}
                        <div className="info-card status-card">
                            <h3 className="info-card-title">
                                <Clock size={18} /> Order Status & Time
                            </h3>
                            <div className="status-info">
                                <span className={`status-badge ${getStatusClass(order.status)}`}>
                                    {order.status}
                                </span>
                                <div className="datetime-info">
                                    <p className="date-text">
                                        <Calendar size={16} />
                                        {formatDate(order.created_at)}
                                    </p>
                                    <p className="time-text">
                                        <Clock size={16} />
                                        {formatTime(order.created_at)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Customer Information */}
                        <div className="info-card">
                            <h3 className="info-card-title">
                                <User size={18} /> Customer Details
                            </h3>
                            <div className="info-content">
                                <p><strong>Name:</strong> {order.user?.name || 'N/A'}</p>
                                <p><strong>Email:</strong> {order.user?.email || 'N/A'}</p>
                                <p><strong>Phone:</strong> {order.phone}</p>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="info-card">
                            <h3 className="info-card-title">
                                <MapPin size={18} /> Shipping Address
                            </h3>
                            <div className="info-content">
                                <p>{order.shipping_address}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Order Items */}
                    <div className="order-items-column">
                        <h3 className="items-title">
                            <Package size={18} /> Ordered Items ({order.order_items?.length || 0})
                        </h3>
                        
                        <div className="items-list">
                            {order.order_items?.map((item) => (
                                <div key={item.id} className="order-item-card">
                                    <img 
                                        src={item.product_image} 
                                        alt={item.product_name}
                                        className="item-image"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://via.placeholder.com/80?text=No+Image';
                                        }}
                                    />
                                    <div className="item-details">
                                        <p className="item-name">{item.product_name}</p>
                                        <p className="item-quantity">
                                            Qty: {item.quantity} × {formatCurrency(item.product_price)}
                                        </p>
                                        <p className="item-subtotal">
                                            {formatCurrency(item.subtotal)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="order-total-card">
                            <p className="total-amount">
                                <span>Total Amount:</span>
                                <span className="total-value">{formatCurrency(order.total_amount)}</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Modal Footer with Action Buttons */}
                {onStatusUpdate && (
                    <div className="order-modal-footer">
                        <button className="btn-secondary" onClick={onClose}>
                            Close
                        </button>
                        {order.status === 'pending' && (
                            <button 
                                className="btn-primary" 
                                onClick={() => onStatusUpdate('processing')}
                            >
                                Mark as Processing
                            </button>
                        )}
                        {order.status === 'processing' && (
                            <>
                                <button 
                                    className="btn-success" 
                                    onClick={() => onStatusUpdate('completed')}
                                >
                                    Mark as Completed
                                </button>
                                <button 
                                    className="btn-danger" 
                                    onClick={() => onStatusUpdate('cancelled')}
                                >
                                    Cancel Order
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderDetailsModal;