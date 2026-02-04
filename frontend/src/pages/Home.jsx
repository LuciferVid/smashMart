import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { fetchData } from '../api';

const Home = () => {
    const navigate = useNavigate();
    const { addToCart, cart } = useAppContext();
    const [products, setProducts] = useState([]);

    const getCartQuantity = (productId) => {
        const cartItem = cart.find(item => (item.id || item._id) === productId);
        return cartItem ? cartItem.quantity : 0;
    };

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchData('/products');
                setProducts(data);
            } catch (err) {
                // Silently fail - will use fallback products
            }
        };
        loadProducts();
    }, []);

    // Fallback products if DB is empty
    const displayProducts = products.length > 0 ? products.slice(0, 8) : [
        { id: '1', name: "Astrex Phantom X-99 Ultra", price: 259.99, image: "https://images.unsplash.com/photo-1626225967045-2c390255979d?q=80&w=800", category: 'Racket' },
        { id: '2', name: "Astrex Orbital Pro Shuttle", price: 44.99, image: "https://images.unsplash.com/photo-1613912303663-1937e0da292c?q=80&w=800", category: 'Shuttle' },
        { id: '3', name: "Gravity Elite Footwear", price: 179.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800", category: 'Shoes' },
        { id: '4', name: "Carbon-Trek Pro Bag", price: 129.99, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800", category: 'Bags' },
        { id: '5', name: "Astrex Performance Tee", price: 34.99, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800", category: 'Apparel' },
        { id: '6', name: "Astrex Wristbands", price: 9.99, image: "https://images.unsplash.com/photo-1588731234159-8b99631b3fde?q=80&w=800", category: 'Accessories' },
        { id: '7', name: "Competition Jersey", price: 49.99, image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800", category: 'Apparel' },
        { id: '8', name: "Titan-String 0.66", price: 12.99, image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=800", category: 'Strings' }
    ];

    return (
        <div className="home-page">
            <div className="announcement-bar">Free Global Shipping on all orders over $150</div>

            {/* HERO SECTION - PREMIUM ANIMATED BACKGROUND */}
            <section className="hero">
                <div className="hero-bg">
                    {/* Dark gradient overlay for text readability only - No Green */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.4) 100%)',
                        zIndex: 1 // Above video
                    }} />

                    {/* Badminton Action Video */}
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=1200"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            zIndex: 0 // Bottom layer
                        }}
                    >
                        <source src="/badminton-bg.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="container">
                    <div className="hero-content">
                        <h1 style={{ color: '#fff' }}>Dominate<br />The Court</h1>
                        <p>Explore the new 2026 Collection. Professional grade equipment for the serious badminton athlete.</p>
                        <div className="btn-group" style={{ display: 'flex', gap: '20px' }}>
                            <button onClick={() => navigate('/shop')} className="btn btn-primary">Shop Collection</button>
                            <button onClick={() => navigate('/shop')} className="btn btn-outline">Explore Gear</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEW ARRIVALS */}
            <section className="section">
                <div className="container">
                    <div className="section-title">
                        <h2 style={{ margin: 0 }}>New Arrivals</h2>
                        <Link to="/shop" style={{ fontSize: '0.9rem', color: 'var(--accent)', fontWeight: 800, textDecoration: 'none' }}>View All Products →</Link>
                    </div>
                    <div className="product-grid">
                        {displayProducts.map(product => (
                            <div key={product.id || product._id} className="product-card">
                                <div className="product-image" onClick={() => navigate('/shop')}>
                                    <img src={product.image} alt={product.name} />
                                    <div style={{ position: 'absolute', top: '15px', left: '15px', background: '#fff', color: '#000', padding: '4px 10px', fontSize: '0.6rem', fontWeight: 900, borderRadius: '2px' }}>NEW</div>
                                </div>
                                <div className="product-info">
                                    <div className="product-category">Series-7 Engineering</div>
                                    <h3 className="product-name">{product.name}</h3>
                                    <div className="product-footer">
                                        <p className="product-price">${product.price}</p>
                                        {getCartQuantity(product.id || product._id) > 0 ? (
                                            <button onClick={() => addToCart(product)} className="add-btn" style={{ background: 'var(--accent)', color: '#000' }}>
                                                +{getCartQuantity(product.id || product._id)}
                                            </button>
                                        ) : (
                                            <button onClick={() => addToCart(product)} className="add-btn">+</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* STORY / LIFESTYLE SECTION */}
            <section className="section" style={{ background: 'var(--bg-sub)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
                        <div style={{ order: 2 }}>
                            <img src="https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?q=80&w=1200" style={{ width: '100%', borderRadius: '12px', boxShadow: 'var(--shadow)' }} alt="Astrex Philosophy" />
                        </div>
                        <div>
                            <span className="section-label" style={{ color: 'var(--accent)', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '2px' }}>OUR PHILOSOPHY</span>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', margin: '20px 0', lineHeight: 1.1 }}>DOMINATE EVERY<br />QUADRANT.</h2>
                            <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem', marginBottom: '30px' }}>At Astrex, we don't just build rackets. We build extensions of your intent. Every curve, string, and grip is calibrated for the singular goal of court dominance.</p>
                            <button onClick={() => navigate('/shop')} className="btn btn-outline">Our Story</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* PERFORMANCE CATEGORIES */}
            <section className="section container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', height: '500px' }}>
                    <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px' }}>
                        <img src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=800" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Rackets" />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '40px' }}>
                            <h3 style={{ fontSize: '2rem', fontWeight: 900 }}>RACKETS</h3>
                            <Link to="/shop" style={{ color: 'var(--accent)', fontWeight: 800, textDecoration: 'none', marginTop: '10px' }}>Shop Now</Link>
                        </div>
                    </div>
                    <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px' }}>
                        <img src="https://images.unsplash.com/photo-1613912303663-1937e0da292c?q=80&w=800" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Shuttles" />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '40px' }}>
                            <h3 style={{ fontSize: '2rem', fontWeight: 900 }}>SHUTTLES</h3>
                            <Link to="/shop" style={{ color: 'var(--accent)', fontWeight: 800, textDecoration: 'none', marginTop: '10px' }}>Shop Now</Link>
                        </div>
                    </div>
                    <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px' }}>
                        <img src="https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?q=80&w=800" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Apparel" />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '40px' }}>
                            <h3 style={{ fontSize: '2rem', fontWeight: 900 }}>APPAREL</h3>
                            <Link to="/shop" style={{ color: 'var(--accent)', fontWeight: 800, textDecoration: 'none', marginTop: '10px' }}>Shop Now</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* IMAGE GALLERY */}
            <section className="section container">
                <div className="section-title">
                    <h2 style={{ margin: 0 }}>The Astrex Circuit</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridAutoRows: '250px', gap: '20px' }}>
                    <div style={{ gridColumn: 'span 2', gridRow: 'span 2', borderRadius: '12px', overflow: 'hidden' }}>
                        <img src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=1200" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Badminton Action" />
                    </div>
                    <div style={{ borderRadius: '12px', overflow: 'hidden' }}>
                        <img src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=800" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Racket Detail" />
                    </div>
                    <div style={{ borderRadius: '12px', overflow: 'hidden' }}>
                        <img src="https://images.unsplash.com/photo-1613912303663-1937e0da292c?q=80&w=800" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Shuttlecocks" />
                    </div>
                    <div style={{ gridColumn: 'span 2', borderRadius: '12px', overflow: 'hidden' }}>
                        <img src="https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?q=80&w=1200" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'translateY(-20%)' }} alt="Action" />
                    </div>
                </div>
            </section>

            {/* TRUST SECTION */}
            <section className="section" style={{ textAlign: 'center', borderTop: '1px solid var(--border)' }}>
                <div className="container">
                    <h2 style={{ marginBottom: '50px' }}>Preferred by Professionals</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '80px', opacity: 0.5, filter: 'grayscale(1)' }}>
                        <span style={{ fontSize: '1.5rem', fontWeight: 900 }}>WBF</span>
                        <span style={{ fontSize: '1.5rem', fontWeight: 900 }}>TOKYO LABS</span>
                        <span style={{ fontSize: '1.5rem', fontWeight: 900 }}>ELITE OPEN</span>
                        <span style={{ fontSize: '1.5rem', fontWeight: 900 }}>PRO-STRING</span>
                    </div>
                </div>
            </section>

            {/* BOTTOM CTA */}
            <section className="section" style={{ background: 'var(--accent)', color: '#000', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', fontWeight: 900, marginBottom: '20px' }}>JOIN THE ELITE.</h2>
                    <p style={{ marginBottom: '40px', fontWeight: 600 }}>Get 10% off your first order when you sign up for the Astrex Roster.</p>
                    <button onClick={() => navigate('/signup')} className="btn" style={{ background: '#000', color: '#fff' }}>Create Account</button>
                </div>
            </section>
        </div>
    );
};

export default Home;
