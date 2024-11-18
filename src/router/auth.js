const {
    hashPassword,
    generateRefreshToken,
    comparePassword,
    generateAccessToken,
    verifyRefreshToken
} = require("../utils/token");
const {user} = require("../orm");
const { v4: uuidv4 } = require('uuid');

const authRouter = require('express').Router();
const User = user

authRouter.post('/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists', field: 'email' });
    }

    const hashedPassword = await hashPassword(password);

    const refreshToken = generateRefreshToken();

    try {
        const user = await User.create({
            email,
            password: hashedPassword,
            refreshToken,
            isActivated: false,
            userId: uuidv4()
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: { email: user.email, userId: user.userId, refreshToken: user.refreshToken }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user', error });
    }
});

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(404).json({ message: 'Email or password not found' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
    }

    const accessToken = generateAccessToken(user.userId);
    const refreshToken = generateRefreshToken(user.userId);

    user.refreshToken = refreshToken;
    await user.save();

    res.json({
        accessToken,
        refreshToken
    });
});

authRouter.post('/refresh-token', async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token required' });
    }

    try {
        const decoded = verifyRefreshToken(refreshToken);

        const user = await User.findOne({
            where: { userId: decoded.userId }
        });

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        const newAccessToken = generateAccessToken(user.userId);
        const newRefreshToken = generateRefreshToken(user.userId);

        user.refreshToken = newRefreshToken;
        await user.save();

        res.json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        });
    } catch (error) {
        res.status(403).json({ message: 'Invalid refresh token', error });
    }
});


module.exports = {
    authRouter
}