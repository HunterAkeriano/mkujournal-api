const express = require('express');
const {authRouter} = require("./src/router/auth");
const {profileRouter} = require("./src/router/profile");
const {catalogRouter} = require("./src/router/catalog");

require('dotenv').config();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');


const allowedOrigins = [
    'http://127.1.3.228:3000',
    'http://127.1.4.116:3000/',
    'http://127.1.3.228:3000/',
    'http://localhost:5173',
    'https://mku-journal.com.ua',
    'http://mku-journal.com.ua',
    'http://mku-journal.com.ua/',
    'https://mku-journal.com.ua/',
    'https://www.mku-journal.online/',
    'https://www.mku-journal.online',
    'https://www.mku-journal.online/api-docs/',
    'https://www.mku-journal.com.ua',
    'PostmanRuntime/7.42.0'
];

const corsOptions = {
    origin: function (origin, callback) {
        if(origin === undefined) {
            callback(null, true)
        }
        else if (allowedOrigins.indexOf(origin) !== -1) {
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

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Vitamin API',
            version: '1.0.0',
            description: 'Документация API для Vitamin Online',
        },
        servers: [
            { url: 'https://www.mku-journal.online' }
        ],
    },
    apis: ['./src/swagger/*.js']
};

app.use(cors(corsOptions));

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/auth', authRouter);
app.use('/catalog', catalogRouter);


app.use(profileRouter)

app.listen(3000,  'localhost', () => {
    console.log('started', HOST + ':' + PORT);
});
