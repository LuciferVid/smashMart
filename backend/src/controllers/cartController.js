const prisma = require('../db');

exports.getCart = async (req, res) => {
    try {
        const cart = await prisma.cart.findUnique({
            where: { userId: req.userData.userId }
        });
        res.json(cart || { items: [] });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch cart' });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.userData.userId;

        if (!productId || !quantity) {
            return res.status(400).json({ error: 'Product ID and quantity are required' });
        }

        let cart = await prisma.cart.findUnique({
            where: { userId }
        });

        let items = [];
        if (!cart) {
            items = [{ productId, quantity: parseInt(quantity) }];
            cart = await prisma.cart.create({
                data: {
                    userId,
                    items
                }
            });
        } else {
            items = Array.isArray(cart.items) ? [...cart.items] : [];
            const itemIndex = items.findIndex(item => item.productId === productId);
            if (itemIndex > -1) {
                items[itemIndex].quantity += parseInt(quantity);
            } else {
                items.push({ productId, quantity: parseInt(quantity) });
            }
            cart = await prisma.cart.update({
                where: { userId },
                data: { items }
            });
        }
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add item to cart' });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.userData.userId;

        if (!productId) {
            return res.status(400).json({ error: 'Product ID is required' });
        }

        let cart = await prisma.cart.findUnique({
            where: { userId }
        });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        const currentItems = Array.isArray(cart.items) ? cart.items : [];
        const items = currentItems.filter(item => item.productId !== productId);
        
        cart = await prisma.cart.update({
            where: { userId },
            data: { items }
        });
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove item from cart' });
    }
};
