import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Header = () => {
    const { user, cart, logoutUser } = useAppContext();

    return (
        <header className="header">
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Link to="/" className="logo">
                    ASTREX
                </Link>

                <nav className="nav">
                    <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
                    <NavLink to="/shop" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Shop</NavLink>
                    {user && <NavLink to="/orders" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Orders</NavLink>}
                    <NavLink to="/cart" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Cart</NavLink>
                    <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Contact Us</NavLink>
                </nav>

                <div className="header-actions">
                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent)' }}>{user.name.split(' ')[0]}</span>
                            <button onClick={logoutUser} className="btn-outline" style={{ padding: '6px 15px', cursor: 'pointer', fontSize: '0.7rem', border: '1px solid var(--border)' }}>Logout</button>
                        </div>
                    ) : (
                        <Link to="/login" className="nav-link" style={{ fontSize: '0.8rem', fontWeight: 700 }}>Sign In</Link>
                    )}

                    <Link to="/cart" className="cart-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                        <span className="cart-count">{cart.length}</span>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
