const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        

        if (!authHeader || typeof authHeader !== 'string' || authHeader.trim() === '') {
            return res.status(401).json({ error: 'Authentication required' });
        }


        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Invalid authentication format' });
        }

        const token = authHeader.substring(7).trim();  
        
        if (!token || token === '') {
            return res.status(401).json({ error: 'Invalid authentication format' });
        }

        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is not set in environment variables');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!decodedToken || !decodedToken.userId) {
            return res.status(401).json({ error: 'Invalid token payload' });
        }

        req.userData = { userId: decodedToken.userId };
        next();
    } catch (error) {
        console.error('Auth middleware error:', error.message);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' });
        }
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};
