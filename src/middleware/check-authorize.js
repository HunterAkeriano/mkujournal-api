const jwt = require('jsonwebtoken');
const db = require("../orm");
const User = db.user

const authorize = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: 'Access token required' });
    }

    try {
        const decoded = jwt.verify(authorization, 'your-secret-key'); //todo: fix or env

        const user = await User.findOne({
            where: { user_id: decoded.user_id }
        });

        if (!user) {
            return res.status(404).json({ message: 'Ви не авторизовані' });
        }

        req.user = user;

        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid access token' });
        }

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Access token expired' });
        }

        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = authorize;
