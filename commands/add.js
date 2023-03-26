const fs = require('fs');
let cooldown = false;
module.exports = {
  name: "add",
  description: "Add data to the database",
  run: function(client, message, args, userMsg, volio) {
    if (cooldown) {
      volio.send(message, "**Bot is on cooldown!**")
    } else {
      if (userMsg.trim().length === 0) {
        volio.send(message, "Data cannot be empty!")
        return;
      }
      cooldown = true;
      const filteredMsg = userMsg.replaceAll(/[\r\n]/gm, ' ');
      fs.writeFileSync("data.txt",
        `"${filteredMsg}",` + "\n",
        {
          encoding: "utf8",
          flag: "a+",
          mode: 0o666
        });
      message.reply(`Successfully added \`${filteredMsg}\` to the database!`)
      setTimeout(() => {
        cooldown = false;
      }, 5000)
    }
  }
}