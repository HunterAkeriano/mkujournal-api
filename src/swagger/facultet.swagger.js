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

/**
 * @swagger
 * /facultet/main-block:
 *   get:
 *     summary: Получить список факультетов с преподавателями
 *     description: Возвращает список всех факультетов с преподавателями, отсортированными по фамилии для каждого факультета.
 *     tags: [Facultet]
 *     responses:
 *       200:
 *         description: Успешный ответ с данными факультетов и преподавателей
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Идентификатор факультета
 *                   name:
 *                     type: string
 *                     description: Название факультета
 *                   teachers:
 *                     type: array
 *                     description: Список преподавателей на данном факультете
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           description: Идентификатор преподавателя
 *                         name:
 *                           type: string
 *                           description: Имя преподавателя
 *                         surName:
 *                           type: string
 *                           description: Фамилия преподавателя
 *                         facultetId:
 *                           type: integer
 *                           description: Идентификатор факультета, к которому относится преподаватель
 *       400:
 *         description: Ошибка выполнения запроса
 */
