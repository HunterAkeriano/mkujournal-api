const {
    hashPassword,
    generateRefreshToken,
    comparePassword,
    generateAccessToken,
    verifyRefreshToken
} = require("../utils/token");
const { validationRoleType, validationEmailFn, getFieldLength } = require("../validation/auth/auth");
const {user, profile} = require("../orm");
const { v4: uuidv4 } = require('uuid');
const {transporter} = require("../utils/mailer");
const {resendPassword, sendRegister} = require("../utils/mail");

const authRouter = require('express').Router();
const User = user
const Profile = profile
const crypto = require('crypto');

function generatePasswordResetToken() {
    return crypto.randomBytes(32).toString('hex');
}

authRouter.post('/register', async (req, res) => {
    const {email, first_name, last_name, password, role_type } = req.body;

    switch (true) {
        case (!email || !password):
            return res.status(400).json({ message: 'Email and password are required' });

        case (!validationEmailFn(email)):
            return res.status(400).json({ message: 'Вкажіть правильний email', field: 'email' });

        case (!role_type || !validationRoleType(role_type)):
            return res.status(400).json({ message: 'No role type passed' });

        case (!getFieldLength(first_name, 2)):
            return res.status(400).json({ message: 'First name required', field: 'first_name' });

        case (!getFieldLength(last_name, 2)):
            return res.status(400).json({ message: 'Last name required', field: 'last_name' });

        case (!getFieldLength(password, 8)):
            return res.status(400).json({ message: 'Password is required', field: 'password' });
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
            role_type,
            refresh_token: refreshToken,
            password: hashedPassword,
            user_id: userId,
        });

        await Profile.create({
            email,
            first_name,
            last_name,
            role_type,
            user_id: userId,
        });

        transporter.sendMail({
            from: 'mkujounal@gmail.com',
            to: email,
            subject: 'MКУ-ЖУНАЛ: Ваш аккаунт успішно зареєстрований',
            html: sendRegister()
        })

        res.status(201).json({
            message: 'Реєстрація успішна',
            user: { email: user.email, userId: user.user_id, refreshToken: user.refresh_token }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Реєстрація не успішна', error });
    }
});

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ message: "Логін та пароль обов'язковий", fields: ['email', 'password'] });
    }

    if(!validationEmailFn(email)) {
        return res.status(400).json({ message: 'Вкажіть правильний email' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(400).json({ message: 'Користувач не знайдений', field: 'email' });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Не правильний пароль', field: 'password' });
    }

    const accessToken = generateAccessToken(user.user_id);
    const refreshToken = generateRefreshToken(user.user_id);

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
            where: { user_id: decoded.user_id }
        });

        if (!user || user.refresh_token !== refreshToken) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        const newAccessToken = generateAccessToken(user.user_id);
        const newRefreshToken = generateRefreshToken(user.user_id);

        user.refresh_token = newRefreshToken;
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
        return res.status(400).json({ message: 'Користувач не знайдений', field: 'email' });
    }

    try {
        const resetToken = generatePasswordResetToken();
        const resetTokenExpiration = new Date();
        resetTokenExpiration.setHours(resetTokenExpiration.getHours() + 1);

        existingUser.reset_token = resetToken;
        existingUser.reset_token_expiration = resetTokenExpiration;
        await existingUser.save();

        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        transporter.sendMail({
            from: 'mkujounal@gmail.com',
            to: email,
            subject: 'MКУ-ЖУНАЛ: Відновлення пароля',
            html: resendPassword(resetLink)
        });

        res.status(200).json({ message: 'Посилання для відновлення пароля надіслано на пошту' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Щось пішло не так', error });
    }
});

authRouter.get('/check-reset-token', async (req, res) => {
    const { token } = req.query;

    if(!token) {
        return res.status(400).json({ message: 'Токен не знайдено' });
    }

    const existingUser = await User.findOne({ where: { reset_token: token } });


    if (!existingUser) {
        return res.status(400).json({ message: 'Токен для відновлення не знайдений', field: 'resetToken' });
    }

    if (existingUser.reset_token_expiration < new Date()) {
        return res.status(400).json({ message: 'Токен для відновлення пароля вийшов' });
    }

    const existingProfile = await Profile.findOne({ where: { email: existingUser.email } });

    return res.status(200).json({
        full_name: existingProfile.name + ' ' + existingProfile.sur_name,
        photo: existingProfile.user_photo,
        role: existingUser.role_type,
        email: existingUser.email,
    })
})

authRouter.post('/set-new-password', async (req, res) => {
    const { resetToken, newPassword } = req.body;

    if (!resetToken || !newPassword) {
        return res.status(400).json({ message: 'Token та новий пароль обов\'язкові' });
    }

    const existingUser = await User.findOne({ where: { reset_token: resetToken } });

    if (!existingUser) {
        return res.status(400).json({ message: 'Токен для відновлення не знайдений', field: 'resetToken' });
    }

    if (existingUser.reset_token_expiration < new Date()) {
        existingUser.reset_token = null;
        existingUser.reset_token_expiration = null;
        await existingUser.save();
        return res.status(400).json({ message: 'Токен для відновлення пароля вийшов' });
    }

    try {
        existingUser.password =  await hashPassword(newPassword);
        existingUser.reset_token = null;
        existingUser.reset_token_expiration = null;
        await existingUser.save();

        res.status(200).json({ message: 'Пароль успішно оновлено' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Щось пішло не так', error });
    }
});

module.exports = {
    authRouter
}