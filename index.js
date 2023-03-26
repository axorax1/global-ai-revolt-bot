const brain = require('brain.js');
const { Client } = require("revolt.js");
const client = new Client();
const volioBot = require('volio');
const volio = new volioBot.client(client);
const config = require('./config.json');

const commands = new volioBot.commandHandler({
  folder: '/commands',
  extension: '.js'
});

commands.changeFolder('./commands')

commands.changeRequireFolder('../../commands')

commands.getCommands();

client.on("ready", async () => {
  console.log('Logged in as ' + volio.username)
});

client.on("message", async (message) => {
  try {
    if (message.content.startsWith(config.prefix)) {
      if (message.content === `${config.prefix}help`) {
        volio.send(message, commands.createBasicHelp(config.prefix));
        return;
      }
      commands.run(client, message, volio, {
        prefix: config.prefix
      });
    }
  } catch (error) {
  }
});

client.loginBot(config.token)