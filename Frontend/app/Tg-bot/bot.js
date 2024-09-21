const { Telegraf, session } = require('telegraf');

const bot = new Telegraf('7686574059:AAGWqHNcI-s_FrWdU2qZFy6-QYlCSR-Bv4s');
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

bot.action('test', (ctx) => {
  ctx.reply('callback data: test')
});

const states = {
  NAME: 1,
  AGE: 2
}
bot.action('form', (ctx) => {
  if (!ctx.session) {
    ctx.session = {};
  }
  ctx.session.state = states.NAME;
  ctx.reply('What\'s ur name?');
});

function isValidAge(age) {
  return !isNaN(age) && age > 0;
}

function isValidName(name) {
  return name.match(/^[a-zA-Z ]+$/);
}

bot.hears(/.*/, (ctx) => {
  const state = ctx.session.state; // ! error
  switch (state) {
    case states.NAME:
      if (isValidName(ctx.message.text)) {
        ctx.session.name = ctx.message.text;
        ctx.session.state = states.AGE;
        ctx.reply('What\'s your age?');
      } else {
        ctx.reply('Invalid Name: Try again.');
      }
      break;
    case states.AGE:
      if (isValidAge(ctx.message.text)) {
        ctx.session.age = ctx.message.text;
        ctx.reply('Thanks for sharing!');
        ctx.reply(`Results: Name: ${ctx.session.name}, Age: ${ctx.session.age}`)
      } else {
        ctx.reply('Invalide Age: Try again');
      }
      break;
  }
});
// when "hi" is typed by user, bot replies 'Hey there'
bot.hears('hi', (ctx) => ctx.reply('Hey there'))

bot.launch();

