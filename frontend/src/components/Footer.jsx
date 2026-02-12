import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUIContext } from '../context/UIContext';

const Footer = () => {
    const [email, setEmail] = useState('');
    const { showToast } = useUIContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            showToast('Welcome to the Lab! You are now subscribed to technical briefings.', 'success');
            setEmail('');
        }
    };

    return (
        <footer style={{ background: 'var(--bg-sub)', borderTop: '1px solid var(--border)', padding: '100px 0 50px' }}>
            <div className="container">
                <div className="footer-grid">
                    {/* BRAND SECTION */}
                    <div>
                        <Link to="/" className="logo" style={{ marginBottom: '25px', display: 'block' }}>
                            ASTREX
                        </Link>
                        <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: '1.8', marginBottom: '30px' }}>
                            Redefining the boundaries of badminton performance through aeronautic engineering and carbon composite innovation. Designed in Tokyo, built for the elite.
                        </p>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <a href="https://www.facebook.com/profile.php?id=61587900607651" target="_blank" rel="noopener noreferrer" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'var(--transition)', color: '#fff' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                            </a>
                            <a href="https://www.instagram.com/alpha._yogesh/" target="_blank" rel="noopener noreferrer" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'var(--transition)', color: '#fff' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            </a>
                            <a href="https://x.com/YogeshK5767" target="_blank" rel="noopener noreferrer" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'var(--transition)', color: '#fff' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.2-17.4 11.8 0 0 1.2-1.2 2.6-2.4-3.9-1.2-5.8-5.3-5.4-9.3 1.1.6 2.3 1 3.6 1.1-3.6-2.4-4.8-6.1-2.9-10 1.9 2.3 4.5 3.8 7.5 4.1.1-.9.4-1.8 1-2.5 1.5-1.9 4.3-2.1 6.1-.5.7-.2 1.5-.5 2.1-.8-.2.8-.7 1.4-1.3 1.8.7-.1 1.4-.3 2.1-.6-.5.7-1.1 1.3-1.7 1.8z"></path></svg>
                            </a>
                        </div>
                    </div>

                    {/* LINKS 1 */}
                    <div>
                        <h4 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '30px' }}>Ecosystem</h4>
                        <ul style={{ listStyle: 'none' }}>
                            <li style={{ marginBottom: '15px' }}><Link to="/" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.9rem', transition: 'var(--transition)' }}>Home</Link></li>
                            <li style={{ marginBottom: '15px' }}><Link to="/shop" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.9rem', transition: 'var(--transition)' }}>The Shop</Link></li>
                            <li style={{ marginBottom: '15px' }}><Link to="/shop" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.9rem', transition: 'var(--transition)' }}>New Arrivals</Link></li>
                            <li style={{ marginBottom: '15px' }}><Link to="/contact" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.9rem', transition: 'var(--transition)' }}>Support</Link></li>
                        </ul>
                    </div>

                    {/* LINKS 2 */}
                    <div>
                        <h4 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '30px' }}>Athlete Hub</h4>
                        <ul style={{ listStyle: 'none' }}>
                            <li style={{ marginBottom: '15px' }}><Link to="/login" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.9rem', transition: 'var(--transition)' }}>Account</Link></li>
                            <li style={{ marginBottom: '15px' }}><Link to="/orders" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.9rem', transition: 'var(--transition)' }}>Track Order</Link></li>
                            <li style={{ marginBottom: '15px' }}><Link to="/cart" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.9rem', transition: 'var(--transition)' }}>Shopping Bag</Link></li>
                            <li style={{ marginBottom: '15px' }}><Link to="/signup" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.9rem', transition: 'var(--transition)' }}>Join Roster</Link></li>
                        </ul>
                    </div>

                    {/* NEWSLETTER */}
                    <div>
                        <h4 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '30px' }}>Laboratory Briefings</h4>
                        <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: '25px' }}>Receive technical updates on new drops and experimental gear.</p>
                        <form style={{ display: 'flex', gap: '10px', marginBottom: '30px' }} onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder="Email address"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ flex: 1, background: '#000', border: '1px solid var(--border)', padding: '12px 15px', borderRadius: '4px', color: '#fff', fontSize: '0.85rem' }}
                            />
                            <button type="submit" className="btn btn-primary" style={{ padding: '12px 20px', fontSize: '0.7rem' }}>Join</button>
                        </form>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', opacity: 1 }}>
                            <img src="https://img.icons8.com/color/48/000000/visa.png" width="32" style={{ cursor: 'pointer', transition: 'transform 0.3s ease' }} onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.target.style.transform = 'scale(1)'} alt="visa" />
                            <img src="https://img.icons8.com/color/48/000000/mastercard.png" width="32" style={{ cursor: 'pointer', transition: 'transform 0.3s ease' }} onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.target.style.transform = 'scale(1)'} alt="mastercard" />
                            <img src="https://img.icons8.com/color/48/000000/apple-pay.png" width="32" style={{ cursor: 'pointer', transition: 'transform 0.3s ease' }} onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.target.style.transform = 'scale(1)'} alt="applepay" />
                            <div style={{ marginLeft: 'auto', border: '1px solid var(--border)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 900, color: 'var(--accent)', letterSpacing: '1px' }}>CERTIFIED 2026</div>
                        </div>
                    </div>
                </div>

                {/* BOTTOM FOOTER */}
                <div className="footer-bottom">
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>© 2026 ASTREX ENGINEERING. ALL RIGHTS RESERVED.</p>
                    <div className="footer-bottom-links">
                        <a href="#" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.75rem' }}>Privacy Policy</a>
                        <a href="#" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.75rem' }}>Terms of Service</a>
                        <a href="#" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.75rem' }}>Global Logistics</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
