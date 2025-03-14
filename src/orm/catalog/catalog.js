const Sequelize = require("sequelize");
module.exports = (sequelize) => {
    return sequelize.define('catalog', {
        id: {
            type: Sequelize.INTEGER,
            unique: true,
            allowNull: false,
            primaryKey: true,
        },
        disabled_subscribe: {
            type: Sequelize.BOOLEAN,
        },
        img: {
            type: Sequelize.STRING,
        },
        img_webp: {
            type: Sequelize.STRING,
        },
        legal_disclaimer: {
            type: Sequelize.STRING,
        },
        directions: {
            type: Sequelize.STRING,
        },
        ingradients: {
            type: Sequelize.STRING,
        },
        indications: {
            type: Sequelize.STRING,
        },
        satefy_information: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
        },
        discount: {
            type: Sequelize.INTEGER,
        },
        price: {
            type: Sequelize.TEXT,
        },
        capsules: {
            type: Sequelize.INTEGER,
        },
        weight_mg: {
            type: Sequelize.INTEGER,
        },
        name: {
            type: Sequelize.TEXT,
        },
        type: {
            type: Sequelize.TEXT,
        },
    }, {
        timestamps: false,
        tableName: 'catalog',
    })
}