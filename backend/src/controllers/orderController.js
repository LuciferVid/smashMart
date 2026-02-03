const prisma = require('../db');
const { MongoClient, ObjectId } = require('mongodb');

// Use dynamic lookup to ensure we get the patched environment variable
const getMongoUri = () => process.env.DATABASE_URL || "mongodb://localhost:27017/badminton";

exports.getOrders = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            where: { userId: req.userData.userId }
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createOrder = async (req, res) => {
    const client = new MongoClient(getMongoUri());
    try {
        const { items, total } = req.body;
        const userId = req.userData.userId;

        // Use native driver fallback for creation on standalone MongoDB
        await client.connect();
        const db = client.db();
        const ordersCollection = db.collection('Order');
        const cartsCollection = db.collection('Cart');

        // Convert string ID to ObjectId for database consistency with Prisma
        const newOrder = {
            userId: new ObjectId(userId),
            items,
            total,
            status: 'pending',
            createdAt: new Date()
        };

        const result = await ordersCollection.insertOne(newOrder);

        // Clear cart fallback
        try {
            await cartsCollection.deleteOne({ userId: new ObjectId(userId) });
        } catch (e) {
            console.warn("Order: Failed to clear cart", e.message);
        }

        res.status(201).json({ id: result.insertedId, ...newOrder, userId });
    } catch (error) {
        console.error("Order Creation Error:", error);
        res.status(400).json({ error: error.message });
    } finally {
        await client.close();
    }
};

exports.deleteOrder = async (req, res) => {
    const client = new MongoClient(getMongoUri());
    try {
        const { id } = req.params;
        const userId = req.userData.userId;

        await client.connect();
        const db = client.db();
        const ordersCollection = db.collection('Order');

        // Verify the order belongs to the user before deleting
        const order = await ordersCollection.findOne({
            _id: new ObjectId(id),
            userId: new ObjectId(userId)
        });

        if (!order) {
            return res.status(404).json({ error: 'Order not found or unauthorized' });
        }

        // Only allow deletion of pending orders
        if (order.status !== 'pending') {
            return res.status(400).json({ error: 'Only pending orders can be cancelled' });
        }

        await ordersCollection.deleteOne({ _id: new ObjectId(id) });

        res.json({ message: 'Order cancelled successfully' });
    } catch (error) {
        console.error("Order Deletion Error:", error);
        res.status(400).json({ error: error.message });
    } finally {
        await client.close();
    }
};
