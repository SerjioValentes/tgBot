import { Bot, InlineKeyboard } from "grammy";
import { Keyboard } from "grammy";
import 'dotenv/config'
const bot = new Bot(process.env.TG_BOT_API_TOKEN || '');
const start = async () => {

  const webLink = 'https://tg-web-app-umber.vercel.app/'
  
    await bot.api.setMyCommands([
      { command: "start", description: "Меню сайта" },
      { command: "web", description: "Перейти на сайт" },
    ]);

  const keyboard = new Keyboard()
    .text("О боте").row()
    .text("О курсе").row()
    .text("Начать обучение").row();


// ------------------------------------------------------------------ Handle the /start command.
bot.command("start", async (ctx) => 
// ------------------------------------------------------------------  Send the menu
    await ctx.reply("Если вы не нашли нужной информации, можете написать мне", { reply_markup: keyboard })
)

bot.command("web", async (ctx) => await ctx.reply("t.me/Vasilkamalovbot/Photography"))

bot.on("message", (ctx) => {
  const item = ctx.msg.text;
  if(item === 'О боте'){
    ctx.reply('Я родился в хорошей семье около года назад. Да он вспего годовалый, но вполне себе способный и умный')
  }
  if(item === 'О курсе'){
    ctx.reply('О курсе много не напишешь. его нужно проходить')
  }

  if(item === 'Начать обучение'){
    ctx.reply('О начни обучение', { 
      reply_markup: {
        keyboard: [
          [{ text: 'Начать обучение', web_app: {
            url: webLink
          } }]
        ]
      }
    })
  }

  ctx.msg.text &&  ['нет', 'Нет', 'no', 'No'].includes(ctx.msg.text) && ctx.reply('ok')
  });

// ------------------------------------------------------------------ Start the bot.
bot.start();    
}
start()