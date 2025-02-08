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
    }, {
        timestamps: false,
        tableName: 'profile',
    })
}