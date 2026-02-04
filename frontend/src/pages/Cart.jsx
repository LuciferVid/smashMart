import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { fetchData } from '../api';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal, user, clearCart } = useAppContext();
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();

    const handleCheckout = async () => {
        if (!user) {
            alert('Please sign in to complete your order.');
            navigate('/login');
            return;
        }

        setIsProcessing(true);
        try {
            const orderData = {
                items: cart.map(item => ({
                    productId: item.id || item._id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image
                })),
                total: cartTotal > 150 ? cartTotal : cartTotal + 15
            };

            await fetchData('/orders', {
                method: 'POST',
                body: JSON.stringify(orderData)
            });

            alert('Order confirmed successfully!');
            clearCart();
            navigate('/');
        } catch (err) {
            alert('Failed to process order: ' + err.message);
        } finally {
            setIsProcessing(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="container" style={{ paddingTop: '150px', paddingBottom: '150px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '20px' }}>Your Cart is Empty</h2>
                <p style={{ marginBottom: '40px', color: 'var(--text-dim)', fontSize: '1.2rem' }}>Looks like you haven't added any gear to your cart yet.</p>
                <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingTop: '80px', paddingBottom: '120px' }}>
            <div className="cart-header">
                <h1 style={{ fontSize: '3rem', fontWeight: 900 }}>Shopping Cart</h1>
                <p style={{ color: 'var(--text-dim)' }}>{cart.length} items in your bag</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '80px' }}>
                <div className="cart-list">
                    {cart.map(item => {
                        const itemId = item.id || item._id;
                        return (
                            <div key={itemId} className="cart-item">
                                <div className="cart-item-img">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '5px' }}>{item.name}</h3>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '15px' }}>Unit Price: ${item.price}</p>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', background: '#000', padding: '8px 15px', borderRadius: '4px', border: '1px solid var(--border)' }}>
                                            <button onClick={() => updateQuantity(itemId, item.quantity - 1)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 900 }}>-</button>
                                            <span style={{ fontWeight: 900, fontSize: '0.9rem', width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(itemId, item.quantity + 1)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 900 }}>+</button>
                                        </div>
                                        <span className="remove-link" onClick={() => removeFromCart(itemId)} style={{ cursor: 'pointer' }}>Remove</span>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent)' }}>${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <aside>
                    <div className="checkout-card">
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '30px' }}>Order Summary</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: 'var(--text-dim)', fontWeight: 600 }}>
                            <span>Subtotal</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px', color: 'var(--text-dim)', fontWeight: 600 }}>
                            <span>Shipping</span>
                            <span style={{ color: 'var(--accent)' }}>{cartTotal > 150 ? 'FREE' : '$15.00'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '25px', borderTop: '1px solid var(--border)', marginBottom: '35px' }}>
                            <span style={{ fontWeight: 800, fontSize: '1.4rem' }}>Total</span>
                            <span style={{ fontWeight: 800, fontSize: '1.4rem', color: 'var(--accent)' }}>${(cartTotal > 150 ? cartTotal : cartTotal + 15).toFixed(2)}</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="btn btn-primary"
                            style={{ width: '100%', opacity: isProcessing ? 0.7 : 1 }}
                            disabled={isProcessing}
                        >
                            {isProcessing ? 'SCANNING TERMINAL...' : 'Checkout Now'}
                        </button>
                        <div style={{ marginTop: '30px', textAlign: 'center' }}>
                            <img src="https://img.icons8.com/color/48/000000/visa.png" width="30" style={{ margin: '0 5px', filter: 'grayscale(1) brightness(2)' }} alt="visa" />
                            <img src="https://img.icons8.com/color/48/000000/mastercard.png" width="30" style={{ margin: '0 5px', filter: 'grayscale(1) brightness(2)' }} alt="mastercard" />
                            <img src="https://img.icons8.com/color/48/000000/apple-pay.png" width="30" style={{ margin: '0 5px', filter: 'grayscale(1) brightness(2)' }} alt="applepay" />
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Cart;
