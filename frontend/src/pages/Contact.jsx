import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('Thank you for contacting us! We will get back to you within 24 hours.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '400px', zIndex: -1, overflow: 'hidden' }}>
                <img src="https://images.unsplash.com/photo-1599586120429-48281b6f0ece?q=80&w=2070" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.1, filter: 'grayscale(1)' }} alt="Contact BG" />
            </div>
            <div className="container" style={{ paddingTop: '80px', paddingBottom: '120px' }}>
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '20px' }}>Get in Touch</h1>
                    <p style={{ color: 'var(--text-dim)', maxWidth: '600px', margin: '0 auto' }}>Our team is here to help you find the perfect gear for your game.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' }}>
                    <div style={{ background: 'var(--bg-sub)', padding: '60px', borderRadius: '16px', border: '1px solid var(--border)' }}>
                        {status && <div style={{ background: 'rgba(0,255,170,0.1)', color: 'var(--accent)', padding: '20px', borderRadius: '8px', marginBottom: '30px', fontWeight: 700 }}>{status}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label>Full Name</label>
                                <input className="input-field" type="text" placeholder="Enter your name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div className="input-group">
                                <label>Email Address</label>
                                <input className="input-field" type="email" placeholder="email@example.com" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                            </div>
                            <div className="input-group">
                                <label>Subject</label>
                                <input className="input-field" type="text" placeholder="How can we help?" required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
                            </div>
                            <div className="input-group">
                                <label>Description</label>
                                <textarea className="input-field" rows="5" placeholder="Tell us more..." required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} style={{ resize: 'none' }}></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }}>Send Message</button>
                        </form>
                    </div>

                    <div>
                        <div style={{ marginBottom: '50px' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '15px' }}>Customer Support</h3>
                            <p style={{ color: 'var(--text-dim)', marginBottom: '10px' }}>Available Mon-Fri, 9am - 6pm JST</p>
                            <p style={{ fontWeight: 700, color: 'var(--accent)' }}>support@astrex.com</p>
                        </div>

                        <div style={{ marginBottom: '50px' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '15px' }}>Global Headquarters</h3>
                            <p style={{ color: 'var(--text-dim)', marginBottom: '10px' }}>Minato-ku, Tokyo</p>
                            <p style={{ color: 'var(--text-dim)' }}>Japan, 105-0001</p>
                        </div>

                        <div style={{ background: 'var(--bg-sub)', padding: '30px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                            <h4 style={{ marginBottom: '20px' }}>Follow Our Tour</h4>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <a href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'var(--transition)' }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                </a>
                                <a href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'var(--transition)' }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.2-17.4 11.8 0 0 1.2-1.2 2.6-2.4-3.9-1.2-5.8-5.3-5.4-9.3 1.1.6 2.3 1 3.6 1.1-3.6-2.4-4.8-6.1-2.9-10 1.9 2.3 4.5 3.8 7.5 4.1.1-.9.4-1.8 1-2.5 1.5-1.9 4.3-2.1 6.1-.5.7-.2 1.5-.5 2.1-.8-.2.8-.7 1.4-1.3 1.8.7-.1 1.4-.3 2.1-.6-.5.7-1.1 1.3-1.7 1.8z"></path></svg>
                                </a>
                                <a href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'var(--transition)' }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
