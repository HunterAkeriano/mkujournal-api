const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('facultet_items', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
    }, {
        timestamps: false,
        tableName: 'facultet_items',
    })
}