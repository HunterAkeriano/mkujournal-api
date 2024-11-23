const express = require('express');
const {authRouter} = require("./src/router/auth");
const authorize = require("./src/middleware/check-authorize");

require('dotenv').config();
const cors = require('cors');

const allowedOrigins = [
    'http://localhost:5173',
    'https://mku-journal.com.ua/',
    'PostmanRuntime/7.42.0'
];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
}

const app = express();
app.use(express.json());
const PORT = process.env.PORT;
const HOST = process.env.HOST;

// app.use(cors(corsOptions));
app.use('/auth', authRouter)

app.get('/profile', authorize, async (req, res) => {
    const user = req.user;

    res.json({
        email: user.email,
        userId: user.userId
    });
});


app.listen(8000,  'localhost', () => {
    console.log('started', HOST + ':' + PORT);
});
