import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useUIContext } from '../context/UIContext';
import { fetchData } from '../api';
import { getProductImage } from '../utils/racketImages';

const Orders = () => {
    const { user } = useAppContext();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const loadOrders = async () => {
            try {
                const data = await fetchData('/orders');
                // Sort by date descending
                const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setOrders(sorted);
            } catch (err) {
                console.error("Failed to load orders:", err);
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, [user, navigate]);

    const { showModal, showToast } = useUIContext();

    const handleCancelOrder = async (orderId) => {
        showModal({
            title: 'Cancel Order',
            message: 'Are you sure you want to cancel this order? This action cannot be undone.',
            type: 'confirm',
            confirmText: 'Yes, Cancel',
            cancelText: 'Keep Order',
            onConfirm: async () => {
                try {
                    await fetchData(`/orders/${orderId}`, {
                        method: 'DELETE'
                    });

                    // Refresh orders list
                    const data = await fetchData('/orders');
                    const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setOrders(sorted);

                    showToast('Order cancelled successfully', 'success');
                } catch (err) {
                    console.error("Failed to cancel order:", err);
                    showToast('Failed to cancel order: ' + err.message, 'error');
                }
            }
        });
    };

    if (!user) return null;

    return (
        <div className="container" style={{ paddingTop: '80px', paddingBottom: '120px' }}>
            <div className="cart-header">
                <h1 style={{ fontSize: '3rem', fontWeight: 900 }}>Your Orders</h1>
                <p style={{ color: 'var(--text-dim)' }}>Track your Astrex gear deliveries and history.</p>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '100px', fontWeight: 800 }}>SCANNING ORDER ARCHIVE...</div>
            ) : orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '100px' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '20px' }}>No orders found.</h2>
                    <p style={{ color: 'var(--text-dim)', marginBottom: '40px' }}>You haven't placed any orders yet.</p>
                    <Link to="/shop" className="btn btn-primary">Visit the Shop</Link>
                </div>
            ) : (
                <div style={{ display: 'grid', gap: '40px' }}>
                    {orders.map((order) => (
                        <div key={order.id} style={{ background: 'var(--bg-sub)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
                            <div className="order-header">
                                <div>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>Order ID</span>
                                    <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>#{order.id.slice(-8).toUpperCase()}</span>
                                </div>
                                <div>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>Date</span>
                                    <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{new Date(order.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>Status</span>
                                    <span style={{ color: 'var(--accent)', fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{order.status}</span>
                                </div>
                                <div>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>Total</span>
                                    <span style={{ fontWeight: 900, fontSize: '1.2rem', color: 'var(--accent)' }}>${order.total.toFixed(2)}</span>
                                </div>
                                {order.status === 'pending' && (
                                    <button
                                        onClick={() => handleCancelOrder(order.id)}
                                        className="btn-outline"
                                        style={{
                                            borderColor: '#ff3b3b',
                                            color: '#ff3b3b',
                                            padding: '8px 20px',
                                            fontSize: '0.7rem'
                                        }}
                                    >
                                        Cancel Order
                                    </button>
                                )}
                            </div>

                            <div style={{ padding: '30px' }}>
                                <div style={{ display: 'grid', gap: '20px' }}>
                                    {order.items.map((item, idx) => (
                                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: idx === order.items.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.05)', paddingBottom: idx === order.items.length - 1 ? 0 : '15px' }}>
                                            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                                <div style={{ width: '50px', height: '50px', background: '#000', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                                                    {(getProductImage(item) || item.image) ? (
                                                        <img src={getProductImage(item) || item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    ) : (
                                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', color: 'var(--text-dim)' }}>GEAR</div>
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{item.name}</h4>
                                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Quantity: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <p style={{ fontWeight: 800 }}>${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
