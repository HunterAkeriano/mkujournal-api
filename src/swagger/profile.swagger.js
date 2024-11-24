/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: Операции с профилями пользователей
 */

/**
 * @swagger
 * /profile/profile:
 *   get:
 *     summary: Получить профиль пользователя
 *     description: Возвращает профиль пользователя, если токен авторизации правильный
 *     tags: [Profile]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Профиль найден и возвращен успешно
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 name:
 *                   type: string
 *                 surName:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 facultetId:
 *                   type: integer
 *                 roleType:
 *                   type: string
 *                 userPhoto:
 *                   type: string
 *       400:
 *         description: Ошибка при получении профиля
 *       401:
 *         description: Не авторизован (неверный или отсутствующий токен)
 *       404:
 *         description: Профиль не найден
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
