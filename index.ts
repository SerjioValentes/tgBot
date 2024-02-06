import { Bot } from "grammy";
import { Menu } from "@grammyjs/menu";
import 'dotenv/config'
// require('dotenv').config()

const bot = new Bot(process.env.TG_BOT_API_TOKEN ? process.env.TG_BOT_API_TOKEN : '');
const start = async () => {

    // Create a simple menu.
const menu = new Menu("my-menu-identifier")
.text("A", (ctx) => ctx.reply("You pressed A!")).row()
.text("B", (ctx) => ctx.reply("You pressed B!"));

// Make it interactive.
bot.use(menu);

bot.command("start", async (ctx) => {
// Send the menu.
await ctx.reply("Check out this menu:", { reply_markup: menu });
});
    
// Handle the /start command.
// bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));

// Handle other messages.
bot.on("message", (ctx) => ctx.reply("Got another message!"));

// Start the bot.
bot.start();    
}

start()

