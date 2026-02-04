const prisma = require('../db');

exports.getProducts = async (req, res) => {
    try {
        const { categoryId } = req.query;
        const products = await prisma.product.findMany({
            where: categoryId ? { categoryId } : {}
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: req.params.id }
        });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, categoryId, stock, image } = req.body;
        
        if (!name || !price || !categoryId) {
            return res.status(400).json({ error: 'Name, price, and category are required' });
        }
        
        const product = await prisma.product.create({
            data: { name, description, price, categoryId, stock, image }
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create product' });
    }
};
