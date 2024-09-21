const { Telegraf } = require('telegraf');

const bot = new Telegraf('7686574059:AAGWqHNcI-s_FrWdU2qZFy6-QYlCSR-Bv4s');
console.log('hello');

bot.start((ctx) => {
  ctx.reply('Welcome to my bot!');
  ctx.reply('Click the button to open the mini app:', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Open Mini App', web_app: { url: 'https://www.google.com'} }],
      ],
    },
  });
})

bot.launch();
