const authorize = require("../middleware/check-authorize");
const {profile, catalog} = require("../orm");
const profileRouter = require('express').Router();
const { Sequelize } = require("sequelize");

const Profile = profile

profileRouter.get('/info', authorize, async (req, res) => {
    try {
        const existingUser = await Profile.findOne({ where: { email: req.user.email } });
        if (!existingUser) {
            return res.status(404).json({ message: 'Профіль не знайдено' });
        }
        const user = existingUser.get({ plain: true });
        const { matrix, ...userWithoutMatrix } = user;

        res.status(200).json(userWithoutMatrix);
    } catch (error) {
        res.status(400).json({ message: 'Профіль не знайдено', error });
    }
});


profileRouter.get('/order-history', authorize, async (req, res) => {
    try {
        const existingUser = await Profile.findOne({ where: { email: req.user.email } });
        if (!existingUser) {
            return res.status(404).json({ message: 'Профиль не найден' });
        }
        const orderHistory = existingUser.matrix || [];

        if (!orderHistory.length) {
            return res.status(200).json({ orders: [] });
        }

        const productIdsSet = new Set();
        for (const order of orderHistory) {
            if (Array.isArray(order)) {
                order.forEach(item => {
                    if (item && item.product_id) {
                        productIdsSet.add(item.product_id);
                    }
                });
            }
        }
        const productIds = Array.from(productIdsSet);

        const products = await catalog.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: productIds
                }
            }
        });

        const productMap = {};
        products.forEach(product => {
            productMap[product.id] = product;
        });

        const ordersDetailed = orderHistory.map(order => {
            const date_created = order.length > 0 ? order[0].date_created : null;
            const order_number = order.length > 0 ? order[0].order_number : null;

            const items =  order.map(item => ({
                product: productMap[item.product_id] || null,
                quantity: item.quantity,
                is_discount: !!productMap[item.product_id].discount,
                total_sum: +(+(productMap[item.product_id].price || 0) * item.quantity * (1 - ((productMap[item.product_id].discount || 0) / 100))).toFixed(2)
            }));

            return { date_created, items, order_number };
        });

        return res.status(200).json({ orders: ordersDetailed });
    } catch (error) {
        console.error("Ошибка при получении заказов:", error);
        return res.status(500).json({ error: error.message });
    }
});


module.exports = {
    profileRouter
}