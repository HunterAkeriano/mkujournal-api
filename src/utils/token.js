const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = 'your-secret-key'; // используйте более сложный и надежный секрет
const JWT_REFRESH_SECRET = 'mamy-ebal'; // секрет для refresh токена
const JWT_ACCESS_EXPIRATION = '15m'; // время жизни access токена
const JWT_REFRESH_EXPIRATION = '7d'; // время жизни refresh токена

const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_ACCESS_EXPIRATION });
};

const generateRefreshToken = (userId) => {
    return jwt.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRATION });
};

const verifyAccessToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

const verifyRefreshToken = (token) => {
    return jwt.verify(token, JWT_REFRESH_SECRET);
};

const hashPassword = (password) => {
    return bcrypt.hashSync(password, 8);
};

const comparePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
};
console.log('sdsa')
module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
    hashPassword,
    comparePassword
};
