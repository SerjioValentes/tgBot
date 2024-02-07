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
    // --------------------------------------------------------------------------------TODO Typing any
    type Context = any;
    type MyContext = Context & ConversationFlavor;
    type MyConversation = Conversation<MyContext>;

    // async function greeting(conversation: MyConversation, ctx: any) {
    //     await ctx.reply("Hi there! What is your name?");
    //     const { message } = await conversation.wait();
    //     await ctx.reply(`Welcome to the chat, ${message.text}!`);
    //   }
    
// const menu = async (ctx: any) => {

    // const mainMenu = {   
    //     inline_keyboard: [
    //         // [{ text: 'Some button text 1', callback_data: (ctx: any) => ctx.reply("Hi!").row() }],
    //         [{ text: 'Some button text 2', callback_data: '2' }],
    //         [{ text: 'Some button text 3', callback_data: '3' }]
    //     ]
    // }
//     return await ctx ? mainMenu : mainMenu
// }
const menu = new Menu("root-menu")
.text(`Приветствую тебя мой друг`, (ctx) => ctx.reply(`${ctx.from?.last_name} + ${ctx?.from?.first_name}`))
.submenu("О боте", "about-bot");

const menuB = new Menu("root-menu")
.text(`muneB`, (ctx) => ctx.reply(`done`));

const menuC = new Menu("root-menu")
.text(`muneC`, (ctx) => ctx.reply(`done C`));

const settings = new Menu("about-bot")
.text("Кто я такой?", (ctx) => ctx.reply("lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum"))

  menu.register(settings);
  bot.use(menu);

// ------------------------------------------------------------------ Handle the /start command.
bot.command("start", async (ctx) => {
    // Send the menu.
    await ctx.reply("Тут есть информация которая тебе нужна?", { 
        // ------------------------------------------------------------------ Menu markup
        reply_markup: menu,
    });
  });

  bot.command("menu", async (ctx) => {
    // Send the menu.
    await ctx.reply(`Check out this menu: ${ctx.from?.last_name} ${ctx?.from?.first_name}`, { 
        // ------------------------------------------------------------------ Menu markup
        reply_markup: {   
              inline_keyboard: [
                  // [{ text: 'Some button text 1', callback_data: (ctx: any) => ctx.reply("Hi!").row() }],
                  [{ text: 'Some button text 2', callback_data: '2' }],
                  [{ text: 'Some button text 3', callback_data: '3' }]
              ]
          },
    });

  });

  bot.on("message", (ctx) => {
    // console.log(ctx);
    ctx.msg.text &&  ['нет', 'Нет', 'no', 'No'].includes(ctx.msg.text) ? 
      (ctx.reply('ok'), {
        reply_markup: menuB,
      })
     : 
        (ctx.reply("Ну и это хорошо 2"), {
          reply_markup: {   
            inline_keyboard: [
                [{ text: 'Some button text 2', callback_data: '2' }],
                [{ text: 'Some button text 3', callback_data: '3' }]
            ]
        },
      })
      
  });

// Start the bot.
bot.start();    
}
start()

