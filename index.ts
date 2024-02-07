import { Bot } from "grammy";
import { Menu } from "@grammyjs/menu";
import {
    type Conversation,
    type ConversationFlavor,
    conversations,
    createConversation,
  } from "@grammyjs/conversations";
import 'dotenv/config'

const bot = new Bot(process.env.TG_BOT_API_TOKEN || '');
const start = async () => {
    await bot.api.setMyCommands([
      { command: "start", description: "Start the bot" },
      { command: "web", description: "Перейти на веб версию" },
      { command: "about", description: "Немного текста об этом боте. Он родился в хорошей семье около года назад. Да он вспего годовалый, но вполне себе способный и умный" },
    ]);
    type Context = any;
    type MyContext = Context & ConversationFlavor;

  const articlesMenu = new Menu("root-menu")
  .text("article", (ctx) => ctx.reply("Hi!"))
  .text("article 2", (ctx) => ctx.reply("Hi!2"))
  .text("article 3", (ctx) => ctx.reply("Hi!3"))

const settings = new Menu("credits-menu")
  .text("Show Credits", (ctx) => ctx.reply("Powered by grammY"))
  .back("Go Back");

  articlesMenu.register(settings);
  bot.use(settings);


// ------------------------------------------------------------------ Handle the /start command.
bot.command("start", async (ctx) => 
// ------------------------------------------------------------------  Send the menu
    await ctx.reply("Here is your menu", { reply_markup: articlesMenu })
)

bot.command("web", async (ctx) => await ctx.reply("t.me/Vasilkamalovbot/Photography"))

  bot.on("message", (ctx) => {
    ctx.msg.text &&  ['нет', 'Нет', 'no', 'No'].includes(ctx.msg.text) ? 
      ctx.reply('ok') : ctx.reply("Ну и это хорошо...")
  });

// ------------------------------------------------------------------ Start the bot.
bot.start();    
}
start()