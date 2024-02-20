
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');

const webAppUrl = 'https://tg-web-app-umber.vercel.app/';

// const bot = new TelegramBot(process.env.TG_BOT_API_TOKEN, {polling: true});
const bot = new TelegramBot('', {polling: true});
const app = express();

app.use(express.json());
app.use(cors());

bot.on('message', async (msg: any) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if(text === '/start') {
        await bot.sendMessage(chatId, 'Open url', {
            reply_markup: {
                keyboard: [
                    [{text: 'Заполнить форму', web_app: {url: webAppUrl}}]
                ]
            }
        })
    }
});

const PORT = 8000;

app.listen(PORT, () => console.log('server started on PORT ' + PORT))