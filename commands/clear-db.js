const fs = require('fs');
module.exports = {
  name: "clear-db",
  description: "Clear the database",
  run: function(client, message, args, userMsg, volio) {
    if (volio.owner != message.author_id) {
      volio.send(message, "Only the owner can clear the database!")
      return
    }
    fs.truncate('data.txt', 0, function(){
      message.reply(`Successfully cleared database!`)
    })
    }
  }