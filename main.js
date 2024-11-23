const express = require('express');
const {authRouter} = require("./src/router/auth");
const authorize = require("./src/middleware/check-authorize");

require('dotenv').config();
const app = express();
app.use(express.json());

app.use('/auth', authRouter)

app.get('/profile', authorize, async (req, res) => {
    const user = req.user;

    res.json({
        email: user.email,
        userId: user.userId
    });
});


app.listen(8001,  '127.0.0.1', () => {
    console.log('Database Host:', process.env.DB_PASSWORD);
});
