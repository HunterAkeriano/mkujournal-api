const Sequelize = require('sequelize');
const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define('users', {
        email: {
            type: Sequelize.STRING(100),
            unique: true,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        refresh_token: {
            type: Sequelize.STRING(255),
            defaultValue: null,
            allowNull: true,
        },
        reset_token_expiration : {
            type: DataTypes.DATE,
            defaultValue: null,
            allowNull: true,
        },
        reset_token : {
            type: Sequelize.STRING(255),
            defaultValue: null,
            allowNull: true,
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
    }, {
        timestamps: false,
        tableName: 'users',
    })
}