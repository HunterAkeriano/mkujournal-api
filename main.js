const express = require('express');
const db = require('./src/orm');
const {
    verifyAccessToken
} = require('./src/utils/token');
const {authRouter} = require("./src/router/auth");


const app = express();
app.use(express.json());

const User = db.user

app.use('/auth', authRouter)

app.get('/profile', async (req, res) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: 'Access token required' });
    }

    try {
        const decoded = verifyAccessToken(authorization);
        const user = await User.findByPk(decoded.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ email: user.email, userId: user.id });
    } catch (error) {
        res.status(401).json({ message: 'Invalid access token', error });
    }
});


app.listen(8001,  '127.0.0.1', () => {
    console.log('Server running on port 8001');
});
