const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('teachers', {
        name: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        surName: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        lastName: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        voice: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        facultetId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
    }, {
        timestamps: false,
        tableName: 'teachers',
    })
}