const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define('test', {
        id: {
            type: Sequelize.INTEGER,
            unique: true,
            primaryKey: true,
        },
        request: {
            type: Sequelize.STRING,
        },
    }, {
        timestamps: false,
        tableName: 'test',
    })
}