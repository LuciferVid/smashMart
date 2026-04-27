import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchData } from '../api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchData('/categories');
                setCategories(data);
            } catch (_err) {
            }
        };
        loadCategories();
    }, []);

    const loginUser = async (credentials) => {
        const data = await fetchData('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        return data;
    };

    const signupUser = async (data) => {
        const response = await fetchData('/auth/signup', {
            method: 'POST',
            body: JSON.stringify(data),
        });
        return response;
    };

    const googleLoginUser = async (credential) => {
        const data = await fetchData('/auth/google', {
            method: 'POST',
            body: JSON.stringify({ credential }),
        });
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        return data;
    };

    const logoutUser = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const addToCart = (product) => {
        setCart((prev) => {
            const pId = product.id || product._id;
            const existing = prev.find((item) => (item.id || item._id) === pId);

            if (existing) {
                return prev.map((item) =>
                    (item.id || item._id) === pId ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, id: pId, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter((item) => {
            const itemId = item.id || item._id;
            return itemId !== productId;
        }));
    };

    const updateQuantity = (productId, quantity) => {
        setCart((prev) =>
            prev.map((item) => {
                const itemId = item.id || item._id;
                return itemId === productId ? { ...item, quantity: Math.max(1, quantity) } : item;
            })
        );
    };

    const clearCart = () => setCart([]);

    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <AppContext.Provider
            value={{
                user,
                setUser,
                loginUser,
                signupUser,
                googleLoginUser,
                logoutUser,
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotal,
                categories,
                loading,
                setLoading,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);
