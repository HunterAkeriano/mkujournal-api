require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    logging: false,
    port: process.env.DB_PORT
});

const User = require('./users/users')(sequelize);
const Profile = require('./users/profile')(sequelize);
const Catalog = require('./catalog/catalog')(sequelize);

module.exports = {
    sequelize,
    user: User,
    profile: Profile,
    catalog: Catalog
}
