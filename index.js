const ViberBot = require('viber-bot').Bot,
BotEvents = require('viber-bot').Events,
TextMessage = require('viber-bot').Message.Text,
express = require('express');
const app = express();

const BOT_ACCOUNT_TOKEN = '4b33643514a7df15-37beb4934e21e413-293b9c05c7c640e7';
if (!BOT_ACCOUNT_TOKEN) {
  console.log('Could not find bot account token key.');
  return;
}
const EXPOSE_URL = 'https://22fbef47.ngrok.io';
if (!EXPOSE_URL) {
  console.log('Could not find exposing url');
  return;
}
  
  const bot = new ViberBot({
    authToken:'4b33643514a7df15-37beb4934e21e413-293b9c05c7c640e7',
    name: "Питание 148 школа",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Katze_weiss.png"
  });

  
  bot.on(BotEvents.SUBSCRIBED, response => {
    response.send(new TextMessage(`Hi there ${response.userProfile.name}. I am ${bot.name}! Feel free to ask me anything.`));
  });
  bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
    hello(response);
    
  });

const port = process.env.PORT || 80;
app.use("/viber/webhook", bot.middleware());
app.listen(port, () => {
  console.log(`Application running on port: ${port}`);
  bot.setWebhook(`${EXPOSE_URL}/viber/webhook`).catch(error => {
    console.log('Can not set webhook on following server. Is it running?');
    console.error(error);
    process.exit(1);
  });
});