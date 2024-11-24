/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Операции с пользователями (регистрация, авторизация и т.д.)
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Регистрация нового пользователя
 *     description: Создает нового пользователя в системе
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surName:
 *                 type: string
 *               dateCreated:
 *                 type: string
 *                 format: date
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               facultet:
 *                 type: string
 *               roleType:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Пользователь успешно зарегистрирован
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     userId:
 *                       type: string
 *                     refreshToken:
 *                       type: string
 *       400:
 *         description: Ошибка при регистрации
 *       500:
 *         description: Внутренняя ошибка сервера
 */



/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Авторизация пользователя
 *     description: Позволяет пользователю войти в систему
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Успешная авторизация, возвращены access и refresh токены
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       400:
 *         description: Ошибка при авторизации
 *       403:
 *         description: Аккаунт пользователя не активирован
 */


/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Обновить access и refresh токены
 *     description: Обновляет токены на основе предоставленного refresh токена
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *             required:
 *               - refreshToken
 *     responses:
 *       200:
 *         description: Успешно обновленные токены
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       400:
 *         description: Токен не был передан
 *       403:
 *         description: Неверный refresh токен
 */


/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Сброс пароля
 *     description: Отправляет новый пароль на указанный email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Новый пароль отправлен на email
 *       400:
 *         description: Письмо не найдено
 *       500:
 *         description: Ошибка сервера при сбросе пароля
 */
