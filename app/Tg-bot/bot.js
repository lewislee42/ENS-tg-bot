const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const { Telegraf, session } = require('telegraf');

const bot_token = process.env.BOT_TOKEN;

const bot = new Telegraf(bot_token);

bot.use(session());

bot.start((ctx) => {
  ctx.reply('Welcome to ENS Manager');
  ctx.reply('Login Page', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'LOGIN', web_app: { url: 'https://rnbkn-223-255-254-102.a.free.pinggy.link/'} }],
      ]
    },
  });
})



bot.launch();

