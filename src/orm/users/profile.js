const Sequelize = require("sequelize");
module.exports = (sequelize) => {
    return sequelize.define('profile', {
        email: {
            type: Sequelize.STRING(100),
            unique: true,
            allowNull: false,
        },
        first_name: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        last_name: {
            type: Sequelize.STRING(100),
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
        state_province: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        postal_code: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        phone: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        city: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        address_two: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        address_one: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
    }, {
        timestamps: false,
        tableName: 'profile',
    })
}