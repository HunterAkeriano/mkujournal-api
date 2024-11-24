const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'mkujounal@gmail.com',
        pass: 'wnvz yjni jfxs kidt',
    }
});

module.exports =  { transporter }