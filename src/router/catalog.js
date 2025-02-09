const catalogRouter = require('express').Router();
const {catalog, profile} = require("../orm");
const { Sequelize } = require("sequelize");

const generateOrderNumber = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

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

catalogRouter.get('/:id/info', async (req, res) => {
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

catalogRouter.post('/create-order', async (req, res) => {
    try {
        const { order, user_id } = req.body;

        if (!Array.isArray(order)) {
            return res.status(400).json({ error: 'Поле "order" должно быть массивом объектов' });
        }

        for (const item of order) {
            if (typeof item.product_id !== 'number') {
                return res.status(400).json({ error: 'Каждый объект заказа должен содержать числовое поле "product_id"', field: 'product_id' });
            }
            if (typeof item.quantity !== 'number' || item.quantity <= 0) {
                return res.status(400).json({ error: 'Каждый объект заказа должен содержать положительное число в поле "quantity"', field: 'quantity' });
            }
        }

        const generateRandomOrderNumber = () => {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let result = '';
            for (let i = 0; i < 8; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return result;
        };

        const orderNumber = generateRandomOrderNumber();
        const currentDate = new Date();
        order.forEach(item => {
            item.date_created = currentDate;
            item.order_number = orderNumber;
        });

        const productIds = order.map(item => item.product_id);

        const products = await catalog.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: productIds
                }
            }
        });

        const foundIds = new Set(products.map(product => product.id));
        const allExist = productIds.every(id => foundIds.has(id));

        if (!allExist) {
            return res.status(400).json({ error: 'Некоторые товары из заказа не существуют' });
        }

        if (!user_id) {
            return res.status(200).json({ data: 'Заказ успешно оформлен' });
        }

        const userProfile = await profile.findOne({ where: { user_id } });
        if (!userProfile) {
            return res.status(404).json({ error: "Профиль не найден" });
        }

        const newOrderHistory = [...(userProfile.matrix || []), order];

        await userProfile.update({ matrix: newOrderHistory });

        return res.status(200).json({ data: 'Заказ успешно оформлен.' });
    } catch (error) {
        console.error('Ошибка при обработке запроса create-order:', error);
        res.status(500).json({ error: error.message });
    }
});

catalogRouter.get('/recommendations', async (req, res) => {
    try {
        const isMain = req.query.is_main !== undefined;
        const orderClause = isMain ? [['id', 'ASC']] : Sequelize.literal('RANDOM()');

        const recommendedProducts = await catalog.findAll({
            order: orderClause,
            limit: 4
        });

        return res.status(200).json({ data: recommendedProducts });
    } catch (error) {
        console.error("Ошибка при получении рекомендованных товаров:", error);
        return res.status(500).json({ error: error.message });
    }
});


module.exports = {
    catalogRouter
};