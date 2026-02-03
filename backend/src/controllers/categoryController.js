const prisma = require('../db');

exports.getCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const { name, image } = req.body;
        const category = await prisma.category.create({
            data: { name, image }
        });
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
