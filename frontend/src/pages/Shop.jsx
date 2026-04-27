import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { fetchData } from '../api';
import { getProductImage } from '../utils/racketImages';

const Shop = () => {
    const { addToCart, categories, cart } = useAppContext();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');

    const getCartQuantity = (productId) => {
        const cartItem = cart.find(item => (item.id || item._id) === productId);
        return cartItem ? cartItem.quantity : 0;
    };

    const query = new URLSearchParams(useLocation().search);
    const categoryId = query.get('category');

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                const data = await fetchData('/products');
                setProducts(data);
                if (categoryId) {
                    const filtered = data.filter(p => p.categoryId === categoryId);
                    setFilteredProducts(filtered);
                    const cat = categories.find(c => c.id === categoryId);
                    if (cat) setActiveCategory(cat.name);
                } else {
                    setFilteredProducts(data);
                }
            } catch {
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, [categoryId, categories]);

    const filterByCategory = (catId, catName) => {
        setActiveCategory(catName);
        if (catId === 'All') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(p => p.categoryId === catId));
        }
    };

    return (
        <div className="shop-page container" style={{ paddingTop: '60px', paddingBottom: '120px' }}>
            <div className="shop-header">
                <div>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '10px' }}>The Shop</h1>
                    <p style={{ color: 'var(--text-dim)' }}>High-performance equipment for the modern court.</p>
                </div>
            </div>

            {/* FEATURED VISUALS */}
            <div className="featured-visuals">
                <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)', aspectRatio: '16/9' }}>
                    <img src="/images/racket-yonex-blue.png" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} alt="Rackets" />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.8rem', letterSpacing: '4px' }}>PRO RACKETS</div>
                </div>
                <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)', aspectRatio: '16/9' }}>
                    <img src="/images/shoe-yonex-aerus.png" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} alt="Shoes" />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.8rem', letterSpacing: '4px' }}>ELITE FOOTWEAR</div>
                </div>
                <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)', aspectRatio: '16/9' }}>
                    <img src="/images/shuttle-mavis-350.png" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} alt="Shuttles" />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.8rem', letterSpacing: '4px' }}>PREMIUM SHUTTLES</div>
                </div>
            </div>

            <div className="shop-grid">
                <aside>
                    <h4 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '25px', borderBottom: '1px solid var(--border)', paddingBottom: '15px' }}>Categories</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '15px' }} className="shop-categories">
                        <li style={{ cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem', color: activeCategory === 'All' ? 'var(--accent)' : 'var(--text-dim)' }} onClick={() => filterByCategory('All', 'All')}>All Equipment</li>
                        {categories.map(cat => (
                            <li key={cat.id || cat._id} style={{ cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem', color: activeCategory === cat.name ? 'var(--accent)' : 'var(--text-dim)' }} onClick={() => filterByCategory(cat.id || cat._id, cat.name)}>{cat.name}</li>
                        ))}
                    </ul>
                </aside>

                <main>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '100px', fontWeight: 800 }}>Loading Store...</div>
                    ) : (
                        <div className="product-grid">
                            {filteredProducts.map(product => (
                                <div key={product.id || product._id} className="product-card">
                                    <div className="product-image">
                                        <img src={getProductImage(product) || product.image} alt={product.name} />
                                    </div>
                                    <div className="product-info">
                                        <div className="product-category">Performance Series</div>
                                        <h3 className="product-name">{product.name}</h3>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '20px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{product.description}</p>
                                        <div className="product-footer">
                                            <p className="product-price">${product.price}</p>
                                            {getCartQuantity(product.id || product._id) > 0 ? (
                                                <button onClick={() => addToCart(product)} className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.7rem', background: 'var(--accent)', color: '#000' }}>
                                                    In Cart ({getCartQuantity(product.id || product._id)})
                                                </button>
                                            ) : (
                                                <button onClick={() => addToCart(product)} className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.7rem' }}>Add to Cart</button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>

    );
};

export default Shop;
