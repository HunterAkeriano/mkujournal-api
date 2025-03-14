const authorize = require("../middleware/check-authorize");
const {profile, catalog, user} = require("../orm");
const profileRouter = require('express').Router();
const { Sequelize } = require("sequelize");
const libphonenumber = require('libphonenumber-js');
const { validationEmailFn, getFieldLength } = require("../validation/auth/auth");
const cardValidator = require('card-validator');
const { comparePassword, hashPassword } = require('../utils/token');

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

            const items = order.map(item => {
                const product = productMap[item.product_id] || null;
                const price = Number(product?.price) || 0;
                const discount = Number(product?.discount) || 0;
                const quantity = item.quantity;
                const discounted_price = +(price - (price * (discount / 100))).toFixed(2);
                let total_sum = discounted_price * quantity;
                total_sum = Math.round(total_sum * 100) / 100;

                return { product, quantity, is_discount: !!discount, total_sum };
            });

            const total_sum_order = items.reduce((sum, item) => sum + item.total_sum, 0);

            return { date_created, items, order_number, total_sum_order };
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

profileRouter.put('/update-card-info', authorize, async (req, res) => {
    try {
        const { card_number, card_cvv, card_date } = req.body;

        if (card_number === undefined || card_cvv === undefined || card_date === undefined) {
            return res.status(400).json({
                message: 'Все поля card_number, card_cvv и card_date обязательны для обновления информации о карте'
            });
        }

        const validations = [
            { field: 'card_number', value: card_number },
            { field: 'card_cvv', value: card_cvv },
            { field: 'card_date', value: card_date }
        ];

        for (const { field, value } of validations) {
            switch (field) {
                case 'card_number': {
                    const cardValidation = cardValidator.number(value);
                    if (!cardValidation.isValid) {
                        return res.status(400).json({ message: 'Неверный номер карты', field: 'card_number' });
                    }
                    break;
                }
                case 'card_cvv': {
                    const cvvValidation = cardValidator.cvv(value, 3);
                    if (!cvvValidation.isValid) {
                        return res.status(400).json({ message: 'Неверный номер CVV', field: 'card_cvv' });
                    }
                    break;
                }
                case 'card_date': {
                    const expValidation = cardValidator.expirationDate(value);
                    if (!expValidation.isValid) {
                        return res.status(400).json({ message: 'Неверная дата истечения срока', field: 'card_date' });
                    }
                    break;
                }
                default:
                    break;
            }
        }

        const existingProfile = await Profile.findOne({ where: { email: req.user.email } });
        if (!existingProfile) {
            return res.status(404).json({ message: 'Профіль не знайдено' });
        }

        await existingProfile.update({
            card_info: {
                card_number,
                card_cvv,
                card_date
            }
        });

        return res.status(200).json({ message: 'Информация о карте успешно обновлена' });
    } catch (error) {
        console.error("Ошибка обновления информации о карте:", error);
        return res.status(500).json({ message: 'Ошибка обновления информации о карте', error: error.message });
    }
});


profileRouter.put('/change-password', authorize, async (req, res) => {
    try {
        const { old_password, new_password } = req.body;

        if (!old_password || !new_password) {
            return res.status(400).json({ message: 'Оба поля old_password и new_password обязательны' });
        }

        const existingUser = await user.findOne({ where: { email: req.user.email } });
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordMatches = comparePassword(old_password, existingUser.password);
        if (!passwordMatches) {
            return res.status(400).json({ message: 'Old password is incorrect', field: 'old_password' });
        }

        const hashedPassword = hashPassword(new_password);

        await existingUser.update({ password: hashedPassword });

        return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error("Ошибка обновления пароля:", error);
        return res.status(500).json({ message: 'Error updating password', error: error.message });
    }
});


module.exports = {
    profileRouter
}