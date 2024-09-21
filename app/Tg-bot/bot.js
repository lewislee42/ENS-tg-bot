const path = require('path');
const axios = require('axios');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const { Telegraf, session } = require('telegraf');

const bot_token = process.env.BOT_TOKEN;
const bot = new Telegraf(bot_token);
bot.use(session());

console.log('bot is running');

// bot.start(async (ctx) => {
//   const userId = ctx.message.chat.id;
//   try {
//     console.log('test');
//     const response = await axios.get(`http://localhost:3000/api/testing_api/${userId}`);
//     if (response.data.isNewUser) {
//       // User is new, send a welcome message
//       ctx.reply('Login Here:', {
//         reply_markup: {
//           inline_keyboard: [
//             [{ text: 'LOGIN', web_app: { url: 'https://rnbkn-223-255-254-102.a.free.pinggy.link/'} }],
//           ]
//         },
//       });
//     } else {
//       // User is not new, send a different message
//       ctx.reply('Already a User?', {
//         reply_markup: {
//           inline_keyboard: [
//             [{ text: 'Create ENS', callback_data: 'create_ens' }],
//           ]
//         },
//       });
//     }
//   } catch (error) {
//     // Handle errors
//     ctx.reply('Error: ' + error.message);

//   }
// });


bot.start((ctx) => {
  ctx.reply('Welcome to ENS Manager');

  ctx.reply('Login Here:', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'LOGIN', web_app: { url: 'https://rnbkn-223-255-254-102.a.free.pinggy.link/'} }],
      ]
    },
  });

  ctx.reply('Already a User?', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Create ENS', callback_data: 'create_ens' }],
        [{ text: 'Manage ENS', callback_data: 'manage_ens' }]
      ]
    },
  });

})

// CREATE ENS ------------------------------------
const states = {
  NAME: 1,
  AGE: 2
}
bot.action('create_ens', (ctx) => {
  if (!ctx.session) {
    ctx.session = {};
  }
  ctx.session.state = states.NAME;
  ctx.reply('Enter ur desired ENS domain name (exclude .eth):');
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
        ctx.reply('State desired Validity period of your Domain Name: (in seconds)');
      } else {
        ctx.reply('Invalid Format: Try again.');
      }
      break;
    case states.AGE:
      if (isValidAge(ctx.message.text)) {
        ctx.session.age = ctx.message.text;
        ctx.reply(`Results: ENS: ${ctx.session.name}, Validity Period: ${ctx.session.age}`)
      } else {
        ctx.reply('Invalid Format: Try again');
      }
      break;
  }
});

// MANAGE ENS --------------------------------------------
// bot.action('manage_ens', async (ctx) => {
//   const userId = 'your_user_id_here';
//   const apiUrl = 'https://your-mongodb-api.com/api/ens-domains';

//   axios.get(`${apiUrl}/${userId}`)
//     .then(response => {
//       const ensDomains = response.data;
//       const keyboard = [];
//       ensDomains.forEach((domain) => {
//         keyboard.push([{ text: domain, callback_data: domain }]);
//       });
//       ctx.reply('Select an ENS domain:', {
//         reply_markup: {
//           inline_keyboard: keyboard,
//         },
//       });
//     })
//     .catch(error => {
//       console.error(error);
//     });
// });

bot.launch();

