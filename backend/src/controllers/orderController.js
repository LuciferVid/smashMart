const prisma = require('../db');

exports.getOrders = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            where: { userId: req.userData.userId },
            orderBy: { createdAt: 'desc' }
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};

exports.createOrder = async (req, res) => {
    try {
        const { items, total } = req.body;
        const userId = req.userData.userId;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Order items are required' });
        }

        if (!total || total <= 0) {
            return res.status(400).json({ error: 'Valid order total is required' });
        }

        const newOrder = await prisma.order.create({
            data: {
                userId,
                items,
                total: parseFloat(total),
                status: 'pending'
            }
        });

        try {
            await prisma.cart.delete({
                where: { userId }
            });
        } catch (e) {
            // Cart might not exist or already be empty, ignore
        }

        res.status(201).json(newOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create order' });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userData.userId;

        if (!id) {
            return res.status(400).json({ error: 'Order ID is required' });
        }

        const order = await prisma.order.findFirst({
            where: {
                id,
                userId
            }
        });

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        if (order.status !== 'pending') {
            return res.status(400).json({ error: 'Only pending orders can be cancelled' });
        }

        await prisma.order.delete({
            where: { id }
        });

        res.json({ message: 'Order cancelled successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to cancel order' });
    }
};
