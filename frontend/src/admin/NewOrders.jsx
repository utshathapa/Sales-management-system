// NewOrders.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, User, Calendar, Eye } from 'lucide-react';
import OrderDetailsModal from "./OrderDetailsModal"; // Assuming modal is now separate
import '../css/AdminOrders.css';

export default function NewOrders() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    useEffect(() => {
        fetchNewOrders();
    }, []);

    const fetchNewOrders = async () => {
        setIsLoading(true);
        try {
            // Fetch Pending Orders
            const pendingResponse = await axios.get('http://127.0.0.1:8080/api/orders/status/pending');
            const pendingOrders = pendingResponse.data.data;

            // Fetch Processing Orders
            const processingResponse = await axios.get('http://127.0.0.1:8080/api/orders/status/processing');
            const processingOrders = processingResponse.data.data;

            // Combine, sort by newest first, and set state
            const combinedOrders = [...pendingOrders, ...processingOrders];
            setOrders(combinedOrders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
        } catch (error) {
            console.error('Failed to fetch new orders:', error);
            alert('Error fetching new orders.');
        } finally {
            setIsLoading(false);
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            await axios.put(`http://127.0.0.1:8080/api/orders/${orderId}/status`, {
                status: newStatus
            });
            
            alert(`Order status updated to ${newStatus}!`);
            fetchNewOrders(); // Refresh the list
        } catch (error) {
            console.error('Failed to update order status:', error);
            alert('Failed to update order status');
        }
    };

    const viewOrderDetails = (order) => {
        setSelectedOrder(order);
        setShowDetailsModal(true);
    };

    if (isLoading) {
        return <div className="admin-orders-loading">Loading new orders...</div>;
    }

    if (orders.length === 0) {
        return (
            <div className="admin-orders-empty">
                <Package size={64} />
                <h3>No New Orders</h3>
                <p>All pending and processing orders have been managed!</p>
            </div>
        );
    }
    
    // Helper to determine status color (assuming CSS styles exist)
    const getStatusColor = (status) => {
        const colors = {
            pending: 'status-pending',
            processing: 'status-processing',
            completed: 'status-completed',
            cancelled: 'status-cancelled'
        };
        return colors[status] || '';
    };


    return (
        <div className="admin-orders-container">
            <h2 className="admin-orders-title">New Orders ({orders.length})</h2>
            
            <div className="orders-table-container">
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Order #</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td className="order-number">#{order.order_number}</td>
                                <td>
                                    <div className="customer-info">
                                        <User size={16} />
                                        <span>{order.user ? order.user.name : 'N/A'}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="date-info">
                                        <Calendar size={16} />
                                        {new Date(order.created_at).toLocaleDateString()}
                                    </div>
                                </td>
                                <td className="order-total">Rs. {order.total_amount}</td>
                                <td>
                                    <span className={`status-badge ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button 
                                            className="btn-view"
                                            onClick={() => viewOrderDetails(order)}
                                        >
                                            <Eye size={16} />
                                            View
                                        </button>
                                        
                                        {/* Pending -> Process */}
                                        {order.status === 'pending' && (
                                            <button 
                                                className="btn-process"
                                                onClick={() => updateOrderStatus(order.id, 'processing')}
                                            >
                                                Process
                                            </button>
                                        )}
                                        
                                        {/* Processing -> Complete/Cancel */}
                                        {order.status === 'processing' && (
                                            <>
                                                <button 
                                                    className="btn-complete"
                                                    onClick={() => updateOrderStatus(order.id, 'completed')}
                                                >
                                                    Complete
                                                </button>
                                                <button 
                                                    className="btn-cancel"
                                                    onClick={() => updateOrderStatus(order.id, 'cancelled')}
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Order Details Modal */}
            {showDetailsModal && selectedOrder && (
                <OrderDetailsModal 
                    order={selectedOrder}
                    onClose={() => setShowDetailsModal(false)}
                    onStatusUpdate={(status) => {
                        updateOrderStatus(selectedOrder.id, status);
                        setShowDetailsModal(false);
                    }}
                />
            )}
        </div>
    );
}