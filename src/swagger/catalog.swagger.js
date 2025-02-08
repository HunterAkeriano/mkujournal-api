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
