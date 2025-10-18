import { Telegraf } from 'telegraf'

// Токен твоего бота
const bot = new Telegraf('6720826721:AAGca7w3fW-wKK9-yAOa4h2aaPaccQhAOcw')

// ID канала (или группы)
const targetChatId = '-1002206913679'
const OWNER_ID = '7282627530'

// === Массивы случайных фраз ===
const randomPhrases = [
    'ты совсем охуел?',
    'может тебе еще ноги помыть?',
    'могу массаж простаты сделать',
    'у меня есть кроссовки бубона, пойдет заменст тапок?'
]

const teaRandom = [
    "я вам ничего делать не буду",
    "ну его нахуй тот чай, лучше на рево закинь",
    "занят, перебираю верховину",
    "чая пока нет, но я крысанул кофе. будешь?",
    "димка, шо там, накопитель мне еще не закрыли на рево?",
    "наркотики - это сила и здоровье",
    "чая нема, есть полторачка водки под кроватью",
    "давай лучше новым утюгом тебе поглажу майку",
    "хочешь наушники подарю?",
    "давай лучше вместе со мной от 100 до 0 посчитаем. 99, 98, 94, 95, 89, 73, 14",
    "я крысанул 10 потрарачек самогона. хватит, чтобы всю квадратную хату напоить"
]

const randomPhrasesAndr = [
    'Андрей то приколист',
    'иди со своим Андреем отседова',
    'Ты шо проверяешься???'
]

const botRandom = [
    "я не разбираюсь в этих ваших технологиях",
    "я 30 лет отсидел, не понимаю о чем ты говоришь",
    "я заснял салфетки братское сердце, сейчас отправлю тебе в сихнал",
    "брат, а как тут в телеграмме видео посмотреть?",
    "я не знаю кто мне этот телеграмм установил. симка только, чтобы маме звонить"
]

const toilet = [
    "там чисто, братик, можешь идти",
    "я шо вам, смотрящий за парашами?",
    "туалетку поменял там и попшикал дезиком",
    "тупая пизда смыла прокладку, пока пробил там, два раза в лицо хлюпнуло",
    "иди братское сердце, если надо, только проволоку там в углу не трогай — я потом заберу домой",
    "можешь пока в ванну насрать, я позже уберу",
    "ты уже видел мою новую швабру?",
    "туалет занят, там Пися Золотая стоя срёт",
    "туалет свободен, 3 за вход и 5 за выход",
    "зацепииила меня",
    "дезодорант новый нужен?",
    "у меня есть видео, как Иванка танцует, возьмёшь с собой в туалет?",
    "конечно же кололся, конечно прямо в пах",
    "я там банку Рево спрятал, которая выпала из пакета"
]

// === Функция для извлечения ID сообщения из ссылки ===
function extractMessageId(text) {
    const linkRegex = /(?:https?:\/\/)?t\.me\/c\/\d+\/(\d+)/
    const match = text.match(linkRegex)
    return match ? parseInt(match[1]) : null
}

// === Обработка всех сообщений ===
bot.on('message', async (ctx) => {
    console.log('=== НОВОЕ СООБЩЕНИЕ ===')
    console.log('Тип чата:', ctx.chat.type)
    console.log('ID отправителя:', ctx.from.id)
    console.log('Тип сообщения:', Object.keys(ctx.message)[1])
    console.log('=====================')

    const messageText = ctx.message.text ? ctx.message.text.toLowerCase() : ''
    const isOwner = ctx.from.id.toString() === OWNER_ID
    const isPrivateChat = ctx.chat.type === 'private'

    // === Реакция на "тапки" ===
    if (messageText.includes('тапки') || messageText.includes('тапочки')) {
        console.log('❌ Найдено ключевое слово (тапки). Отправляю случайную фразу.')
        const randomPhrase = randomPhrases[Math.floor(Math.random() * randomPhrases.length)]
        try {
            await ctx.reply(randomPhrase)
            console.log('✅ Случайная фраза успешно отправлена!')
        } catch (error) {
            console.error('❌ Ошибка при отправке случайной фразы:', error)
        }
    }

    // === Реакция на "Андрей" ===
    if (messageText.includes('андрей')) {
        console.log('❌ Найдено ключевое слово (Андрей). Отправляю случайную фразу.')
        const randomPhrase = randomPhrasesAndr[Math.floor(Math.random() * randomPhrasesAndr.length)]
        try {
            await ctx.reply(randomPhrase)
            console.log('✅ Случайная фраза успешно отправлена!')
        } catch (error) {
            console.error('❌ Ошибка при отправке случайной фразы:', error)
        }
    }

    // === Реакция на "чай / кофе / рево" ===
    if (
        messageText.includes('чай') ||
        messageText.includes('чая') ||
        messageText.includes('кофе') ||
        messageText.includes('рево')
    ) {
        console.log('❌ Найдено ключевое слово (чай/кофе/рево). Отправляю случайную фразу.')
        const randomPhrase = teaRandom[Math.floor(Math.random() * teaRandom.length)]
        try {
            await ctx.reply(randomPhrase)
            console.log('✅ Случайная фраза успешно отправлена!')
        } catch (error) {
            console.error('❌ Ошибка при отправке случайной фразы:', error)
        }
    }

    // === Реакция на "бот / технологии / телеграмм" ===
    if (
        messageText.includes('бот') ||
        messageText.includes('ботик') ||
        messageText.includes('технолог') ||
        messageText.includes('телеграм') ||
        messageText.includes('айти') ||
        messageText.includes('интернет')
    ) {
        console.log('❌ Найдено ключевое слово (бот/технологии/телеграмм). Отправляю случайную фразу.')
        const randomPhrase = botRandom[Math.floor(Math.random() * botRandom.length)]
        try {
            await ctx.reply(randomPhrase)
            console.log('✅ Случайная фраза успешно отправлена!')
        } catch (error) {
            console.error('❌ Ошибка при отправке случайной фразы:', error)
        }
    }

    // === Реакция на "туалет / сортир / ванна / параша" ===
    if (
        messageText.includes('туалет') ||
        messageText.includes('сортир') ||
        messageText.includes('унитаз') ||
        messageText.includes('ванна') ||
        messageText.includes('параша') ||
        messageText.includes('срать') ||
        messageText.includes('поссать') ||
        messageText.includes('говно')
    ) {
        console.log('❌ Найдено ключевое слово (туалет/сортир/ванна). Отправляю случайную фразу.')
        const randomPhrase = toilet[Math.floor(Math.random() * toilet.length)]
        try {
            await ctx.reply(randomPhrase)
            console.log('✅ Случайная фраза успешно отправлена!')
        } catch (error) {
            console.error('❌ Ошибка при отправке случайной фразы:', error)
        }
    }

    // === Отправка сообщений владельцем ===
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
        console.log('❌ Не от владельца или не в личке, игнорирую')
    }
})

bot.launch()

console.log('Бот запущен!')