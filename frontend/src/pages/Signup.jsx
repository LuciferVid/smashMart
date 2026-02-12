import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { GoogleLogin } from '@react-oauth/google';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const { signupUser, googleLoginUser } = useAppContext();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signupUser(formData);
            navigate('/login');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleSuccess = async (response) => {
        try {
            await googleLoginUser(response.credential);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Google registration failed. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
                <img src="https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?q=80&w=2070" alt="BG" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15 }} />
            </div>
            <div className="auth-form">
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--accent)', fontWeight: 800, letterSpacing: '3px', textTransform: 'uppercase' }}>Join the Arsenal</span>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginTop: '10px' }}>Create Registry</h1>
                </div>

                {error && <p style={{ color: '#ff3b3b', marginBottom: '20px', textAlign: 'center', fontSize: '0.8rem', fontWeight: 700 }}>{error}</p>}

                <div style={{ marginBottom: '25px', display: 'flex', justifyContent: 'center' }}>
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => setError('Google Authentication Failed')}
                        theme="filled_black"
                        shape="rectangular"
                        width="100%"
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', color: 'var(--text-dim)', fontSize: '0.75rem' }}>
                    <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
                    <span style={{ margin: '0 10px', fontWeight: 800 }}>OR USE EMAIL</span>
                    <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Athlete Name</label>
                        <input className="input-field" type="text" placeholder="Full Name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div className="input-group">
                        <label>Registry Email</label>
                        <input className="input-field" type="email" placeholder="name@email.com" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                    <div className="input-group">
                        <label>Security Key</label>
                        <input className="input-field" type="password" placeholder="••••••••" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '18px' }}>Register Athlete</button>
                </form>
                <p style={{ marginTop: '30px', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                    Already on the roster? <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 700, textDecoration: 'none' }}>Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
