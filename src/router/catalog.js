const catalogRouter = require('express').Router();
const {catalog} = require("../orm");
const { Sequelize } = require("sequelize");

catalogRouter.get('/all-list', async (req, res) => {
    try {
        const { type } = req.query;

        const page = req.query.page ? parseInt(req.query.page, 10) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
        const offset = (page - 1) * limit;

        let whereCondition = {};
        if (type) {
            whereCondition = Sequelize.where(
                Sequelize.fn('lower', Sequelize.col('type')),
                '=',
                type.toLowerCase()
            );
        }

        const { rows, count } = await catalog.findAndCountAll({
            where: whereCondition,
            limit,
            offset,
        });

        const totalPages = Math.ceil(count / limit);

        res.json({
            data: rows,
            meta: {
                totalItems: count,
                currentPage: page,
                totalPages: totalPages,
            },
        });
    } catch (error) {
        console.error('Ошибка при получении товаров:', error);
        res.status(500).json({ error: error.message });
    }
});

catalogRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const product = await catalog.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: 'Товар не найден' });
        }

        res.json(product);
    } catch (error) {
        console.error('Ошибка при получении товара по ID:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = {
    catalogRouter
};