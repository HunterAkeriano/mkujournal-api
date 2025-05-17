/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: Операции с профилем пользователя
 */

/**
 * @swagger
 * /profile/info:
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
 * /profile/order-history:
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

/**
 * @swagger
 * /profile/update-profile:
 *   put:
 *     summary: Обновление профиля пользователя
 *     description: Обновляет профиль пользователя. Все поля являются обязательными. Если email изменяется, обновляется также и запись в таблице users.
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Объект с данными для обновления профиля
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - first_name
 *               - last_name
 *               - address_one
 *               - address_two
 *               - city
 *               - phone
 *               - postal_code
 *               - state_province
 *             properties:
 *               email:
 *                 type: string
 *                 description: Адрес электронной почты
 *                 example: "user@example.com"
 *               first_name:
 *                 type: string
 *                 description: Имя пользователя
 *                 example: "Иван"
 *               last_name:
 *                 type: string
 *                 description: Фамилия пользователя
 *                 example: "Иванов"
 *               address_one:
 *                 type: string
 *                 description: Первый адрес
 *                 example: "ул. Ленина, 1"
 *               address_two:
 *                 type: string
 *                 description: Второй адрес
 *                 example: "Квартира 101"
 *               city:
 *                 type: string
 *                 description: Город
 *                 example: "Киев"
 *               phone:
 *                 type: string
 *                 description: Телефон (должен быть валидным)
 *                 example: "+380501234567"
 *               postal_code:
 *                 type: string
 *                 description: Почтовый индекс
 *                 example: "01001"
 *               state_province:
 *                 type: string
 *                 description: Область или провинция
 *                 example: "Киевская область"
 *     responses:
 *       200:
 *         description: Профиль успешно обновлен.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Профіль успішно оновлено"
 *       400:
 *         description: Ошибка валидации обязательных полей.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email is required"
 *                 field:
 *                   type: string
 *                   example: "email"
 *       404:
 *         description: Профиль не найден.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Профіль не знайдено"
 *       500:
 *         description: Внутренняя ошибка сервера при обновлении профиля.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Помилка оновлення профілю"
 *                 error:
 *                   type: string
 *                   example: "Error details..."
 */
/**
 * @swagger
 * /profile/update-card-info:
 *   put:
 *     summary: Обновление информации о банковской карте
 *     description: Обновляет информацию о банковской карте пользователя. Требуется предоставить номер карты, CVV и дату истечения срока действия.
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Объект с информацией о банковской карте для обновления
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - card_number
 *               - card_cvv
 *               - card_date
 *             properties:
 *               card_number:
 *                 type: string
 *                 description: Номер банковской карты
 *                 example: "4111111111111111"
 *               card_cvv:
 *                 type: string
 *                 description: CVV-код карты
 *                 example: "123"
 *               card_date:
 *                 type: string
 *                 description: Дата истечения срока действия карты (формат MM/YY или MM/YYYY)
 *                 example: "12/24"
 *     responses:
 *       200:
 *         description: Информация о карте успешно обновлена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Информация о карте успешно обновлена"
 *       400:
 *         description: Ошибка валидации входных данных
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Неверный номер карты"
 *                 field:
 *                   type: string
 *                   example: "card_number"
 *       404:
 *         description: Профиль не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Профіль не знайдено"
 *       500:
 *         description: Ошибка обновления информации о карте
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка обновления информации о карте"
 *                 error:
 *                   type: string
 *                   example: "Error details..."
 */
/**
 * @swagger
 * /profile/change-password:
 *   put:
 *     summary: Изменение пароля пользователя
 *     description: Изменяет пароль пользователя. Требуется предоставить старый и новый пароль.
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Объект с паролями для смены
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - old_password
 *               - new_password
 *             properties:
 *               old_password:
 *                 type: string
 *                 description: Старый пароль пользователя
 *                 example: "oldPassword123"
 *               new_password:
 *                 type: string
 *                 description: Новый пароль пользователя
 *                 example: "newPassword456"
 *     responses:
 *       200:
 *         description: Пароль успешно обновлен.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password updated successfully"
 *       400:
 *         description: Неверный старый пароль или отсутствуют необходимые поля.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Old password is incorrect"
 *       404:
 *         description: Пользователь не найден.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Внутренняя ошибка сервера при обновлении пароля.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error updating password"
 *                 error:
 *                   type: string
 *                   example: "Error details..."
 */
/**
 * @swagger
 * /profile/users:
 *   get:
 *     summary: Получение списка пользователей
 *     description: Возвращает список всех пользователей с их email, ролью и ФИО (если есть профиль). Поддерживает пагинацию, фильтрацию по роли и поиск по email или user_id.
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Поиск по email или user_id
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [whosale, regular]
 *         description: Фильтрация по роли
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Номер страницы
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Количество пользователей на странице
 *     responses:
 *       200:
 *         description: Список пользователей успешно получен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   description: Список пользователей
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Уникальный идентификатор пользователя (user_id)
 *                         example: "abc123"
 *                       email:
 *                         type: string
 *                         description: Email пользователя
 *                         example: "user@example.com"
 *                       role:
 *                         type: string
 *                         description: Роль пользователя
 *                         example: "whosale"
 *                       name:
 *                         type: string
 *                         description: Имя пользователя (из профиля)
 *                         example: "Иван Иванов"
 *                 meta:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                       example: 57
 *                     currentPage:
 *                       type: integer
 *                       example: 2
 *                     totalPages:
 *                       type: integer
 *                       example: 6
 *       400:
 *         description: Ошибка в переданных параметрах (например, несуществующая роль)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Заданой роли не существует"
 *       500:
 *         description: Внутренняя ошибка при получении списка пользователей
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Не удалось получить список пользователей"
 *                 error:
 *                   type: string
 *                   example: "Database error details..."
 */
