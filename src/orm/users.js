const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: Sequelize.STRING(100),
            unique: true,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING(43),
            allowNull: false,
        },
        refreshToken: {
            type: Sequelize.STRING(255),
            defaultValue: null,
            allowNull: true,
        },
        isActivated: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        userId: {
            type: Sequelize.STRING(100),
            unique: true,
            allowNull: false,
        },
    }, {
        timestamps: false,
        tableName: 'users',
    })
}