const fs = require('fs');
let cooldown = false;
module.exports = {
  name: "uptime",
  description: "Get the bot's uptime",
  run: function(client, message, args, userMsg, volio) {
    volio.send(message, {embeds: [{
      title: `${volio.username} Uptime`,
      description: `**Uptime:**
      ${volio.uptimeReadable()}`
    }]})
  }
}