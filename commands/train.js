const brain = require('brain.js');
const fs = require('fs')
module.exports = {
  name: "train",
  description: "Train the AI",
  run: function(client, message, args, userMsg, volio) {
    if (volio.owner != message.author_id) {
      volio.send(message, "Only the owner can train the bot!")
      return
    }

    const net = new brain.recurrent.LSTM();

    const data = JSON.parse("[" + String(fs.readFileSync('./data.txt',
      { encoding: 'utf8', flag: 'r' })).slice(0, -1).slice(0, -1) + "]");

    let log = "";

    net.train(data, {
      log: (stats) => { log += stats + '\n'; console.log(stats) },
      logPeriod: 10,
      iterations: 100
    })

    const networkState = net.toJSON();
    fs.writeFileSync("network_state.json", JSON.stringify(networkState), "utf-8");

    volio.send(message, {
      embeds: [
        {
          title: `${volio.username} train`,
          description: `**Data:**
      ${data}
        
      **Training Logs:**
      ${log}`
        }
      ]
    })

  }
}