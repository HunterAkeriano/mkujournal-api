/**
 * @swagger
 * tags:
 *   name: Catalog
 *   description: Операции с товарами каталога
 */

/**
 * @swagger
 * /catalog/all-list:
 *   get:
 *     summary: Получение списка товаров
 *     description: Возвращает список товаров с возможностью фильтрации по типу и поддержки пагинации.
 *     tags: [Catalog]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Фильтр по типу товара (без учета регистра).
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Номер страницы для пагинации.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Количество элементов на странице.
 *     responses:
 *       200:
 *         description: Успешное получение списка товаров.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Объект товара каталога
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Название товара"
 *                       type:
 *                         type: string
 *                         example: "Тип товара"
 *                 meta:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                     currentPage:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       500:
 *         description: Ошибка сервера. Возвращается сообщение об ошибке.
 */

/**
 * @swagger
 * /catalog/{id}:
 *   get:
 *     summary: Получение конкретного товара по ID
 *     description: Возвращает конкретный товар по его ID.
 *     tags: [Catalog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID товара
 *     responses:
 *       200:
 *         description: Успешное получение товара.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Объект товара каталога
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Название товара"
 *                 type:
 *                   type: string
 *                   example: "Тип товара"
 *       404:
 *         description: Товар не найден.
 *       500:
 *         description: Ошибка сервера. Возвращается сообщение об ошибке.
 */
/**
 * @swagger
 * /catalog/create-order:
 *   post:
 *     summary: Создание заказа
 *     description: >
 *       Принимает заказ в виде массива объектов, где каждый объект содержит идентификатор товара (`product_id`)
 *       и его количество (`quantity`). Если передан `user_id`, заказ сохраняется в историю заказов профиля,
 *       иначе возвращается сообщение об успешном оформлении заказа.
 *     tags: [Catalog]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - order
 *             properties:
 *               order:
 *                 type: array
 *                 description: Массив объектов заказа. Каждый объект должен содержать поля product_id и quantity.
 *                 items:
 *                   type: object
 *                   required:
 *                     - product_id
 *                     - quantity
 *                   properties:
 *                     product_id:
 *                       type: number
 *                       example: 1
 *                     quantity:
 *                       type: number
 *                       example: 2
 *               user_id:
 *                 type: string
 *                 description: Идентификатор пользователя. Если не передан, заказ не сохраняется в профиль.
 *                 example: "cd0bdd5b-fcb4-4f00-bedc-4b6a3596ca44"
 *     responses:
 *       200:
 *         description: Заказ успешно оформлен.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   example: "Заказ успешно оформлен."
 *       400:
 *         description: Неверный формат данных или некоторые товары не существуют.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Поле \"order\" должно быть массивом объектов"
 *       404:
 *         description: Профиль пользователя не найден.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
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
 *                   example: "Ошибка при обработке запроса create-order: ..."
 */
