module.exports = {
  name: "ping",
  description: "Get the bot's ping",
  run: function(client, message, args, userMsg, volio) {
    volio.send(message, {
      embeds: [{
        title: `${volio.username} Ping`,
        description: `**Ping:** ${volio.ping()}ms`
      }]
    })
  }
}