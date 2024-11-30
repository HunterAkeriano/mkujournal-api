const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('speciality', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        full_name: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        speciality_code: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    }, {
        timestamps: false,
        tableName: 'speciality',
    })
}