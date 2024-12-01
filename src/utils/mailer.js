const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'mkujounal@gmail.com',
        pass: 'wnvz yjni jfxs kidt',
    }
});

module.exports =  { transporter }