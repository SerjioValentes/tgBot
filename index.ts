import { Bot } from "grammy";
import { Keyboard, InlineKeyboard } from "grammy";
import { Menu } from "@grammyjs/menu";
import 'dotenv/config'
const bot = new Bot(process.env.TG_BOT_API_TOKEN || '');
const start = async () => {
    await bot.api.setMyCommands([
      { command: "start", description: "Меню сайта" },
      { command: "web", description: "Перейти на сайт" },
    ]);
  
    // const menu = new Menu("menu")
    // .text("О боте", (ctx) => ctx.reply("You pressed A!")).row()
    // .text("О курсе", (ctx) => ctx.reply("You pressed B!")).row()
    // .text("Начать обучение", (ctx) => ctx.reply("You pressed B!")).row();

  const keyboard = new Keyboard()
    .text("О боте").row()
    .text("О курсе").row()
    .text("Начать обучение").row();
  
  // const articlesMenu = new Menu("root-menu")
  // .text("article", (ctx) => ctx.reply("Hi!"))
  // .text("article 2", (ctx) => ctx.reply("Hi!2"))
  // .text("article 3", (ctx) => ctx.reply("Hi!3"))

// const settings = new Menu("credits-menu")
//   .text("Show Credits", (ctx) => ctx.reply("Powered by grammY"))
//   .back("Go Back");

//   articlesMenu.register(settings);
  // bot.use(settings);


// ------------------------------------------------------------------ Handle the /start command.
bot.command("start", async (ctx) => 
// ------------------------------------------------------------------  Send the menu
    await ctx.reply("Если вы не нашли нужной информации, можете написать мне", { reply_markup: keyboard })
)

bot.command("web", async (ctx) => await ctx.reply("t.me/Vasilkamalovbot/Photography"))

bot.on("message", (ctx) => {
  // const item = ctx.match;
  const item = ctx.msg.text;
  if(item === 'О боте'){
    ctx.reply('Я родился в хорошей семье около года назад. Да он вспего годовалый, но вполне себе способный и умный')
  }
  if(item === 'О курсе'){
    ctx.reply('О курсе много не напишешь. его нужно проходить')
  }

  ctx.msg.text &&  ['нет', 'Нет', 'no', 'No'].includes(ctx.msg.text) && ctx.reply('ok')
  });

// ------------------------------------------------------------------ Start the bot.
bot.start();    
}
start()