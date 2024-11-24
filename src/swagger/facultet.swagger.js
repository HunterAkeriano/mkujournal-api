/**
 * @swagger
 * tags:
 *   name: Facultet
 *   description: Операции с факультетами
 */

/**
 * @swagger
 * /facultet/select:
 *   get:
 *     summary: Получить список факультетов
 *     description: Возвращает список всех факультетов, с возможностью фильтрации по названию
 *     tags: [Facultet]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Строка для фильтрации факультетов по названию (необязательный параметр)
 *     responses:
 *       200:
 *         description: Список факультетов
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *       400:
 *         description: Ошибка выполнения запроса
 */
