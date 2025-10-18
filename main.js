import { Telegraf } from 'telegraf'

// Токен твоего бота
const bot = new Telegraf('6720826721:AAGca7w3fW-wKK9-yAOa4h2aaPaccQhAOcw')

// ID канала (или группы)
const targetChatId = '-1002206913679'
const OWNER_ID = '7282627530'

// Массив со случайными фразами
const randomPhrases = [
    'ты шо голова тубазитовая, сдурэла',
    'занят, конспект пишу этому... как его.. ну ты понял',
    'на дальнем будем',
    'несу в зубах',
    'щас, только палец из розетки вытащу',
    'всё в норме, по курсу летим',
    'иди, поцелуй белку в лоб',
    'я тут умом тронулся, но ненадолго',
    'загружаю мозги, подожди',
    'не мешай, я в параллельной вселенной',
    'у меня по расписанию "ничегонеделание"',
    'от винта!',
    'не дёргай тигра за усы',
    'давай я тебе лучше анекдот расскажу',
    'у меня лапки',
    'слышь, ты, борода из ваты',
    'не грузи меня, я не КамАЗ',
    'мысли улетели на юга',
    'а у тебя что, сегодня день сурка?',
    'я в танке',
    'сам себе на уме',
    'отстань от меня, я в печали',
    'перезвони мне, я не в ресурсе',
    'всё будет в лучшем виде',
    'я тут мимо проходил',
    'что-то мне подсказывает, что это провал',
    'ну, шо там, как дела?',
    'я ещё не проснулся',
    'только через мой труп',
    'я не согласен, но мне интересно'
];

const randomPhrasesAndr = [
   'Андрей то приколист',
    'иди со своим Андреем отседова',
    'Ты шо проверяешься???',
]

// Функция для извлечения ID сообщения из ссылки
function extractMessageId(text) {
    // Ищем ссылки вида t.me/c/1002206913679/123 или https://t.me/c/1002206913679/123
    const linkRegex = /(?:https?:\/\/)?t\.me\/c\/\d+\/(\d+)/
    const match = text.match(linkRegex)
    return match ? parseInt(match[1]) : null
}

// Обработка всех сообщений
bot.on('message', async (ctx) => {
    console.log('=== НОВОЕ СООБЩЕНИЕ ===')
    console.log('Тип чата:', ctx.chat.type)
    console.log('ID отправителя:', ctx.from.id)
    console.log('Тип сообщения:', Object.keys(ctx.message)[1])
    console.log('=====================')

    const messageText = ctx.message.text ? ctx.message.text.toLowerCase() : ''
    const isOwner = ctx.from.id.toString() === OWNER_ID
    const isPrivateChat = ctx.chat.type === 'private'

    // Проверяем, содержит ли сообщение ключевые слова в любом типе чата
    if (messageText.toLowerCase().includes('тапки') || messageText.toLowerCase().includes('тапочки')) {
        console.log('❌ Найдено ключевое слово. Отправляю случайную фразу.')

        // Выбираем случайную фразу из массива
        const randomPhrase = randomPhrases[Math.floor(Math.random() * randomPhrases.length)]

        try {
            // Отправляем ответ с выбранной фразой в тот же чат
            await ctx.reply(randomPhrase)
            console.log('✅ Случайная фраза успешно отправлена!')
        } catch (error) {
            console.error('❌ Ошибка при отправке случайной фразы:', error)
        }
    }

    if (messageText.toLowerCase().includes('андрей')) {
        console.log('❌ Найдено ключевое слово. Отправляю случайную фразу.')

        // Выбираем случайную фразу из массива
        const randomPhrase = randomPhrasesAndr[Math.floor(Math.random() * randomPhrasesAndr.length)]

        try {
            // Отправляем ответ с выбранной фразой в тот же чат
            await ctx.reply(randomPhrase)
            console.log('✅ Случайная фраза успешно отправлена!')
        } catch (error) {
            console.error('❌ Ошибка при отправке случайной фразы:', error)
        }
    }

    // Обрабатываем сообщения только от владельца в личке, как и раньше
    if (isPrivateChat && isOwner) {
        console.log('✅ Сообщение от владельца в личке')

        const userMessageText = ctx.message.caption || ctx.message.text

        const messageId = userMessageText ? extractMessageId(userMessageText) : null

        if (messageId) {
            console.log(`🔗 Найдена ссылка на сообщение ID: ${messageId}`)

            const replyText = userMessageText.replace(/(?:https?:\/\/)?t\.me\/c\/\d+\/\d+/g, '').trim()

            if (replyText) {
                try {
                    await ctx.telegram.sendMessage(targetChatId, replyText, {
                        reply_to_message_id: messageId
                    })
                    await ctx.reply('✅ Ответ отправлен на сообщение!')
                    console.log('✅ Ответ успешно отправлен!')
                } catch (error) {
                    console.error('❌ Ошибка при отправке ответа:', error)
                    await ctx.reply('❌ Ошибка при отправке ответа!')
                }
            } else {
                try {
                    await ctx.telegram.copyMessage(targetChatId, ctx.chat.id, ctx.message.message_id, {
                        reply_to_message_id: messageId
                    })
                    await ctx.reply('✅ Медиафайл отправлен в канал как ответ!')
                    console.log('✅ Медиафайл успешно отправлен!')
                } catch (error) {
                    console.error('❌ Ошибка при пересылке медиа:', error)
                    await ctx.reply('❌ Ошибка при пересылке медиа!')
                }
            }
        } else {
            console.log('📝 Обычное сообщение без ссылки')

            try {
                await ctx.telegram.copyMessage(targetChatId, ctx.chat.id, ctx.message.message_id)
                await ctx.reply('✅ Сообщение отправлено в канал!')
                console.log('✅ Сообщение успешно отправлено!')
            } catch (error) {
                console.error('❌ Ошибка:', error)
                await ctx.reply('❌ Ошибка при отправке!')
            }
        }
    } else if (!isPrivateChat && !messageText.includes('тапки') && !messageText.includes('тапочки')) {
        // Игнорируем сообщения в группе, если они не содержат ключевых слов
        console.log('❌ Не от владельца или не в личке, игнорирую')
    }
})

bot.launch()

console.log('Бот запущен!')