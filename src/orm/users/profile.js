const Sequelize = require("sequelize");
module.exports = (sequelize) => {
    return sequelize.define('profile', {
        email: {
            type: Sequelize.STRING(100),
            unique: true,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        sur_name: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        date_created: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        phone: {
            type: Sequelize.STRING(19),
            allowNull: false,
        },
        facultet_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: Sequelize.STRING(100),
            unique: true,
            primaryKey: true,
            allowNull: false,
        },
        role_type: {
            type: Sequelize.STRING(5),
            unique: true,
            allowNull: false,
        },
        user_photo: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        gender: {
            type: Sequelize.STRING(),
            allowNull: false,
        }
    }, {
        timestamps: false,
        tableName: 'profile',
    })
}