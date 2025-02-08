/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: Операции с профилем пользователя
 */

/**
 * @swagger
 * /info:
 *   get:
 *     summary: Получение информации о профиле
 *     description: Возвращает данные профиля авторизованного пользователя.
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Профиль успешно получен.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 email:
 *                   type: string
 *                   example: "user@example.com"
 *                 name:
 *                   type: string
 *                   example: "Иван Иванов"
 *       400:
 *         description: Профиль не найден или произошла ошибка.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Профіль не знайдено"
 *                 error:
 *                   type: string
 *                   example: "Error details..."
 */

/**
 * @swagger
 * /order-history:
 *   get:
 *     summary: Получение истории заказов пользователя
 *     description: Возвращает историю заказов для авторизованного пользователя.
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: История заказов успешно получена.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orders:
 *                   type: array
 *                   description: Список заказов
 *                   items:
 *                     type: object
 *                     properties:
 *                       date_created:
 *                         type: string
 *                         format: date-time
 *                         description: Дата создания заказа
 *                         example: "2025-02-08T12:34:56.789Z"
 *                       order_number:
 *                         type: string
 *                         description: Номер заказа
 *                         example: "A1B2C3D4"
 *                       items:
 *                         type: array
 *                         description: Список товаров в заказе
 *                         items:
 *                           type: object
 *                           properties:
 *                             product:
 *                               type: object
 *                               description: Информация о товаре
 *                               additionalProperties: true
 *                             quantity:
 *                               type: number
 *                               description: Количество товара
 *                               example: 2
 *                             is_discount:
 *                               type: boolean
 *                               description: Признак наличия скидки
 *                               example: true
 *                             total_sum:
 *                               type: number
 *                               description: Итоговая сумма с учетом скидки
 *                               example: 199.99
 *       404:
 *         description: Профиль не найден.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Профиль не найден"
 *       500:
 *         description: Внутренняя ошибка сервера.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Ошибка при получении заказов: ..."
 */
