const authorize = require("../middleware/check-authorize");
const {profile, catalog, user} = require("../orm");
const profileRouter = require('express').Router();
const { Sequelize } = require("sequelize");
const libphonenumber = require('libphonenumber-js');
const { validationEmailFn, getFieldLength } = require("../validation/auth/auth");

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

profileRouter.put('/update-profile', authorize, async (req, res) => {
    try {
        const existingProfile = await Profile.findOne({ where: { email: req.user.email } });
        if (!existingProfile) {
            return res.status(404).json({ message: 'Профіль не знайдено' });
        }
        const oldEmail = existingProfile.email;

        const {
            email,
            first_name,
            last_name,
            address_one,
            address_two,
            city,
            phone,
            postal_code,
            state_province
        } = req.body;

        const updateData = {};

        const fields = [
            { key: "email", value: email, message: "Email is required" },
            { key: "first_name", value: first_name, message: "First name is required" },
            { key: "last_name", value: last_name, message: "Last name is required" },
            { key: "address_one", value: address_one, message: "Address one is required" },
            { key: "address_two", value: address_two, message: "Address two is required" },
            { key: "city", value: city, message: "City is required" },
            { key: "phone", value: phone, message: "Phone is required" },
            { key: "postal_code", value: postal_code, message: "Postal code is required" },
            { key: "state_province", value: state_province, message: "State/Province is required" }
        ];

        for (const field of fields) {
            switch (field.key) {
                case "email":
                    if (field.value === undefined || field.value === null || field.value === "") {
                        return res.status(400).json({ message: field.message, field: field.key });
                    }
                    if(!validationEmailFn(field.value)) {
                        return res.status(400).json({ message: 'Email is not valid', field: field.key });
                    }
                    updateData.email = field.value;
                    break;
                case "first_name":
                    if (field.value === undefined || field.value === null || field.value === "") {
                        return res.status(400).json({ message: field.message, field: field.key  });
                    }
                    updateData.first_name = field.value;
                    break;
                case "last_name":
                    if (field.value === undefined || field.value === null || field.value === "") {
                        return res.status(400).json({ message: field.message, field: field.key  });
                    }
                    updateData.last_name = field.value;
                    break;
                case "address_one":
                    if (field.value === undefined || field.value === null || field.value === "") {
                        return res.status(400).json({ message: field.message, field: field.key  });
                    }
                    updateData.address_one = field.value;
                    break;
                case "address_two":
                    if (field.value === undefined || field.value === null || field.value === "") {
                        return res.status(400).json({ message: field.message, field: field.key  });
                    }
                    updateData.address_two = field.value;
                    break;
                case "city":
                    if (field.value === undefined || field.value === null || field.value === "") {
                        return res.status(400).json({ message: field.message, field: field.key  });
                    }
                    updateData.city = field.value;
                    break;
                case "phone":
                    if (field.value === undefined || field.value === null || field.value === "") {
                        return res.status(400).json({ message: field.message, field: field.key  });
                    }

                    if(!libphonenumber.isValidPhoneNumber(field.value)) {
                        return res.status(400).json({ message: 'Phone is not valid', field: field.key  });
                    }
                    updateData.phone = field.value;
                    break;
                case "postal_code":
                    if (field.value === undefined || field.value === null || field.value === "") {
                        return res.status(400).json({ message: field.message, field: field.key  });
                    }
                    updateData.postal_code = field.value;
                    break;
                case "state_province":
                    if (field.value === undefined || field.value === null || field.value === "") {
                        return res.status(400).json({ message: field.message, field: field.key  });
                    }
                    updateData.state_province = field.value;
                    break;
                default:
                    break;
            }
        }

        await existingProfile.update(updateData);

        if (email && email !== oldEmail) {
            await user.update(updateData, { where: { email: oldEmail } });
        }

        return res.status(200).json({ message: 'Профіль успішно оновлено' });
    } catch (error) {
        console.error("Помилка оновлення профілю:", error);
        return res.status(500).json({ message: 'Помилка оновлення профілю', error: error.message });
    }
});


module.exports = {
    profileRouter
}