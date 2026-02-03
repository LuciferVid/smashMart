const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            console.warn("[AUTH MIDDLEWARE] Missing Authorization Header");
            return res.status(401).json({ error: 'Authentication required. No token provided.' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            console.warn("[AUTH MIDDLEWARE] Malformed Header - No Token");
            return res.status(401).json({ error: 'Malformed authentication header.' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (error) {
        console.error("[AUTH MIDDLEWARE] Error:", error.message);
        res.status(401).json({ error: 'Invalid or expired token sessions.' });
    }
};
