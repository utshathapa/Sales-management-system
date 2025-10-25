// OrderHistory.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, User, Calendar, Eye } from 'lucide-react';
import OrderDetailsModal from "./OrderDetailsModal"; // Assuming modal is now separate
import '../css/AdminOrders.css';

export default function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            // Only fetch completed orders
            const url = 'http://127.0.0.1:8080/api/orders/status/completed';
            
            const response = await axios.get(url);
            setOrders(response.data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
        } catch (error) {
            console.error('Failed to fetch orders:', error);
            alert('Error fetching order history.');
        } finally {
            setIsLoading(false);
        }
    };

    const viewOrderDetails = (order) => {
        setSelectedOrder(order);
        setShowDetailsModal(true);
    };

    if (isLoading) {
        return <div className="admin-orders-loading">Loading order history...</div>;
    }

    return (
        <div className="admin-orders-container">
            <div className="orders-header">
                <h2 className="admin-orders-title">Completed Orders ({orders.length})</h2>
            </div>

            {orders.length === 0 ? (
                <div className="admin-orders-empty">
                    <Package size={64} />
                    <h3>No Completed Orders</h3>
                    <p>No orders have been completed yet.</p>
                </div>
            ) : (
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
                                        <span className="status-badge status-completed">
                                            Completed
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button 
                                                className="btn-view"
                                                onClick={() => viewOrderDetails(order)}
                                            >
                                                <Eye size={16} />
                                                View Details
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Order Details Modal */}
            {showDetailsModal && selectedOrder && (
                <OrderDetailsModal 
                    order={selectedOrder}
                    onClose={() => setShowDetailsModal(false)}
                    onStatusUpdate={null} // No status updates for completed orders
                />
            )}
        </div>
    );
}