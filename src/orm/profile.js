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
        surName: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        dateCreated: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        phone: {
            type: Sequelize.STRING(19),
            allowNull: false,
        },
        facultetId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        userId: {
            type: Sequelize.STRING(100),
            unique: true,
            primaryKey: true,
            allowNull: false,
        },
        roleType: {
            type: Sequelize.STRING(5),
            unique: true,
            allowNull: false,
        },
        userPhoto: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
    }, {
        timestamps: false,
        tableName: 'profile',
    })
}