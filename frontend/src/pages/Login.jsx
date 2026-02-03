import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const { loginUser } = useAppContext();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginUser(credentials);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-container">
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
                <img src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=2070" alt="BG" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15 }} />
            </div>
            <div className="auth-form">
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--accent)', fontWeight: 800, letterSpacing: '3px', textTransform: 'uppercase' }}>Secure Authentication</span>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginTop: '10px' }}>Athlete Login</h1>
                </div>

                {error && <p style={{ color: '#ff3b3b', marginBottom: '20px', textAlign: 'center', fontSize: '0.8rem', fontWeight: 700 }}>{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Registry Email</label>
                        <input className="input-field" type="email" placeholder="name@email.com" required value={credentials.email} onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} />
                    </div>
                    <div className="input-group">
                        <label>Security Key</label>
                        <input className="input-field" type="password" placeholder="••••••••" required value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '18px' }}>Log In to Roster</button>
                </form>
                <p style={{ marginTop: '30px', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                    New to the elite? <Link to="/signup" style={{ color: 'var(--accent)', fontWeight: 700, textDecoration: 'none' }}>Create Registry</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
