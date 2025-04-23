
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import axios from 'axios';
import './orderHistory.css';

const OrdersHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const userId = localStorage.getItem('userId');
                
                if (!userId) {
                    setError('Please login to view your orders');
                    setLoading(false);
                    return;
                }

                const response = await axios.get(
                    `http://localhost:5000/api/order/user-orders/${userId}`
                );

                setOrders(response.data);
            } catch (err) {
                console.error("Error fetching orders:", err);
                setError(err.response?.data?.message || 'Failed to load orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleReorder = (order) => {
        if (window.confirm(`Add all ${order.items.length} items from this order to your cart?`)) {
            let addedCount = 0;
            order.items.forEach(item => {
                addToCart({
                    name: item.name,
                    price: item.price,
                    img: item.image || './default-food.jpg',
                    selectedBase: item.selectedBase,
                    selectedToppings: item.selectedToppings
                }, item.quantity);
                addedCount += item.quantity;
            });
            
            setSuccessMessage(`Added ${addedCount} items to your cart!`);
            setTimeout(() => setSuccessMessage(null), 3000);
        }
    };

    if (loading) {
        return <div className="loading">Loading your orders...</div>;
    }

    if (error) {
        return (
            <div className="error-container">
                <div className="error-message">{error}</div>
                {error.includes('login') && (
                    <button onClick={() => navigate('/')} className="login-btn">
                        Go to Login
                    </button>
                )}
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="no-orders">
                <h2>Your Orders</h2>
                <p>You haven't placed any orders yet.</p>
                <button onClick={() => navigate('/menu')} className="browse-btn">
                    Browse Menu
                </button>
            </div>
        );
    }

    return (
        <div className="orders-container">
            <h2>Your Orders</h2>
            
            {successMessage && (
                <div className="success-message">
                    <span>{successMessage}</span>
                    <button onClick={() => navigate('/cartPage')} className="view-cart-btn">
                        View Cart
                    </button>
                </div>
            )}

            <div className="orders-list">
                {orders.map((order) => (
                    <div key={order._id} className="order-card">
                        <div className="order-header">
                            <span className="order-id">Order #{order._id.substring(0, 8)}</span>
                            <span className="order-date">
                                {new Date(order.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </span>
                        </div>
                        
                        <div className="order-items">
                            {order.items?.map((item, index) => (
                                <div key={index} className="order-item">
                                    <div className="item-image">
                                        {item.image ? (
                                            <img 
                                                src={item.image} 
                                                alt={item.name}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = '/images/default-food.jpg';
                                                }}
                                            />
                                        ) : (
                                            <div className="image-placeholder">
                                                No Image
                                            </div>
                                        )}
                                    </div>
                                    <div className="item-details">
                                        <h4>{item.name}</h4>
                                        <p>Quantity: {item.quantity}</p>
                                        <p>Price: Rs. {item.price.toFixed(2)}</p>
                                        {item.selectedBase && <p>Base: {item.selectedBase}</p>}
                                        {item.selectedToppings?.length > 0 && (
                                            <p>Toppings: {item.selectedToppings.join(', ')}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="price-breakdown">
                            <div>
                                <span>Subtotal:</span>
                                <span>Rs. {order.subtotal?.toFixed(2) || '0.00'}</span>
                            </div>
                            <div>
                                <span>Tax:</span>
                                <span>Rs. {order.tax?.toFixed(2) || '0.00'}</span>
                            </div>
                            <div>
                                <span>Delivery:</span>
                                <span>Rs. {order.deliveryFee?.toFixed(2) || '0.00'}</span>
                            </div>
                            <div>
                                <span>Tip:</span>
                                <span>Rs. {order.tip?.toFixed(2) || '0.00'}</span>
                            </div>
                            <div className="order-total">
                                <span>Total:</span>
                                <span>Rs. {order.totalPrice?.toFixed(2) || '0.00'}</span>
                            </div>
                        </div>

                        <div className="order-actions">
                            <button 
                                onClick={() => handleReorder(order)}
                                className="reorder-btn"
                            >
                                Reorder
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrdersHistory;
