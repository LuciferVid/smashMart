const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../db');
const { MongoClient, ObjectId } = require('mongodb');

// We use native MongoDB driver for signup as a fallback because Prisma 
// requires a Replica Set for transactions (even simple creates in some Mongo versions).
// Use dynamic lookup to ensure we get the patched environment variable
const getMongoUri = () => process.env.DATABASE_URL || "mongodb://localhost:27017/badminton";

exports.signup = async (req, res) => {
    console.log("Signup Request Received:", req.body.email);
    const client = new MongoClient(getMongoUri());

    try {
        const { email, password, name } = req.body;

        // Check if user exists using Prisma (read works fine on standalone)
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            console.log("Signup Error: User already exists", email);
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Use native driver to bypass Prisma's Transaction requirement on standalone MongoDB
        await client.connect();
        const db = client.db(); // Uses DB from URI or default
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

        console.log("User Created Successfully via Native Driver:", userId);

        const token = jwt.sign({ userId }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
        res.status(201).json({ token, user: { id: userId, email, name } });

    } catch (error) {
        console.error("Signup Internal Error:", error);
        // Sanitize error message for frontend
        res.status(500).json({ error: 'Registration failed. Please check your connection and try again.' });
    } finally {
        await client.close();
    }
};

exports.login = async (req, res) => {
    console.log("Login Request Received:", req.body.email);
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            console.log("Login Error: User not found", email);
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Login Error: Password mismatch", email);
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        console.log("Login Successful:", user.id);
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
        res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } catch (error) {
        console.error("Login Internal Error:", error);
        // Sanitize error message for frontend
        res.status(500).json({ error: 'Login failed. Please try again later.' });
    }
};
