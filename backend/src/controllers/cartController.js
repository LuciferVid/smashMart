const prisma = require('../db');
const { MongoClient, ObjectId } = require('mongodb');

const MONGODB_URI = process.env.DATABASE_URL || "mongodb://localhost:27017/badminton";

exports.getCart = async (req, res) => {
    try {
        const cart = await prisma.cart.findUnique({
            where: { userId: req.userData.userId }
        });
        res.json(cart || { items: [] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addToCart = async (req, res) => {
    const client = new MongoClient(getMongoUri());
    try {
        const { productId, quantity } = req.body;
        const userId = req.userData.userId;

        await client.connect();
        const db = client.db();
        const cartsCollection = db.collection('Cart');

        // Note: For native driver fallback on standalone, we use ObjectId for userId
        // to stay compatible with Prisma which expects ObjectId in the _id/userId field.
        let cart = await cartsCollection.findOne({ userId: new ObjectId(userId) });

        if (!cart) {
            const result = await cartsCollection.insertOne({
                userId: new ObjectId(userId),
                items: [{ productId, quantity: parseInt(quantity) }]
            });
            cart = { id: result.insertedId, userId, items: [{ productId, quantity: parseInt(quantity) }] };
        } else {
            const itemIndex = cart.items.findIndex(item => item.productId === productId);
            const items = [...cart.items];
            if (itemIndex > -1) {
                items[itemIndex].quantity += parseInt(quantity);
            } else {
                items.push({ productId, quantity: parseInt(quantity) });
            }
            await cartsCollection.updateOne(
                { userId: new ObjectId(userId) },
                { $set: { items } }
            );
            cart.items = items;
        }
        res.json(cart);
    } catch (error) {
        console.error("Cart Error:", error);
        res.status(400).json({ error: error.message });
    } finally {
        await client.close();
    }
};

exports.removeFromCart = async (req, res) => {
    const client = new MongoClient(MONGODB_URI);
    try {
        const { productId } = req.body;
        const userId = req.userData.userId;

        await client.connect();
        const db = client.db();
        const cartsCollection = db.collection('Cart');

        let cart = await cartsCollection.findOne({ userId: new ObjectId(userId) });
        if (!cart) throw new Error('Cart not found');

        const items = cart.items.filter(item => item.productId !== productId);
        await cartsCollection.updateOne(
            { userId: new ObjectId(userId) },
            { $set: { items } }
        );
        res.json({ ...cart, items });
    } catch (error) {
        res.status(400).json({ error: error.message });
    } finally {
        await client.close();
    }
};
