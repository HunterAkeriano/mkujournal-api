const {
    hashPassword,
    generateRefreshToken,
    comparePassword,
    generateAccessToken,
    verifyRefreshToken
} = require("../utils/token");
const {user, profile} = require("../orm");
const { v4: uuidv4 } = require('uuid');

const authRouter = require('express').Router();
const User = user
const Profile = profile

function generateRandomPassword(length = 8) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }
    return password;
}

authRouter.post('/register', async (req, res) => {
    const {name, surName, dateCreated, email, password, phone, facultet, roleType } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    if (!roleType) {
        return res.status(400).json({ message: 'No role type passed' });
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
        return res.status(400).json({ message: 'Користувач вже зареєстрований', field: 'email' });
    }

    const hashedPassword = await hashPassword(password);

    const refreshToken = generateRefreshToken();

    try {
        const userId = uuidv4();

        const user = await User.create({
            email,
            refreshToken,
            roleType,
            password: hashedPassword,
            isActivated: false,
            userId: userId,
            isAdmin: false,
        });

        await Profile.create({
            email,
            name,
            surName,
           dateCreated: new Date(dateCreated),
            phone,
            facultetId: facultet,
            userId: userId,
            roleType,
            userPhoto: '',
        });

        res.status(201).json({
            message: 'Реєстрація успішна',
            user: { email: user.email, userId: user.userId, refreshToken: user.refreshToken }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Реєстрація не успішна', error });
    }
});

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(404).json({ message: "Логін та пароль обов'язковий", fields: ['email', 'password'] });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(400).json({ message: 'Користувач не знайдений', field: 'email' });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Не правильний пароль', field: 'password' });
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

authRouter.post('/reset-password', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
        return res.status(404).json({ message: 'Користувач не знайдений', field: 'email' });
    }

    try {
        const newPassword = generateRandomPassword();

        const hashedPassword = await hashPassword(newPassword);

        existingUser.password = hashedPassword;

        res.status(200).json({ message: 'Новий пароль відправлений на пошту' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong', error });
    }
});


module.exports = {
    authRouter
}