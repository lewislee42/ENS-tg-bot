const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const { Telegraf, session } = require('telegraf');

const bot_token = process.env.BOT_TOKEN;

const bot = new Telegraf(bot_token);
console.log('bot is running...');

bot.use(session());

bot.start((ctx) => {
  ctx.reply('Welcome to my bot!');
  ctx.reply('Click the button to open the mini app:', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Open Mini App', web_app: { url: 'https://rnbkn-223-255-254-102.a.free.pinggy.link/'} }],
        [{ text: 'call /test', callback_data: 'test'}],
        [{ text: 'start form', callback_data: 'form'}]
      ]
    },
  });
})



bot.launch();

