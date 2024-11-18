const Sequelize = require('sequelize');

const sequelize = new Sequelize('mkujournal', 'root', '', {
    dialect: 'mysql',
    host: '127.0.0.1',
    logging: false,
})


const User = require('./users')(sequelize);

module.exports = {
    sequelize,
    user: User,
}