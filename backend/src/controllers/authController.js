const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../db');
const { MongoClient, ObjectId } = require('mongodb');

const getMongoUri = () => process.env.DATABASE_URL || "mongodb://localhost:27017/badminton";

exports.signup = async (req, res) => {
    const client = new MongoClient(getMongoUri());

    try {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await client.connect();
        const db = client.db();
        const usersCollection = db.collection('User');

        const newUser = {
            email,
            password: hashedPassword,
            name,
            role: 'user',
            createdAt: new Date()
        };

        const result = await usersCollection.insertOne(newUser);
        const userId = result.insertedId.toString();

        const token = jwt.sign({ userId }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
        res.status(201).json({ token, user: { id: userId, email, name } });

    } catch (error) {
        res.status(500).json({ error: 'Registration failed. Please try again.' });
    } finally {
        await client.close();
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
        res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } catch (error) {
        res.status(500).json({ error: 'Login failed. Please try again.' });
    }
};
