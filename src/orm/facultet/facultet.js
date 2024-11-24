const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('facultet', {
        name: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
    }, {
        timestamps: false,
        tableName: 'facultet',
    })
}