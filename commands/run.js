const brain = require('brain.js');
const fs = require('fs')
module.exports = {
  name: "run",
  description: "Run the AI",
  run: function(client, message, args, userMsg, volio) {
    if (userMsg.trim().length === 0) {
      volio.send(message, "Input cannot be empty!")
    }
    const net = new brain.recurrent.LSTM();

    const networkState = JSON.parse(fs.readFileSync("network_state.json", "utf-8"));
    net.fromJSON(networkState);

    const output = net.run(userMsg)

    volio.send(message, {
      embeds: [{
        title: `${volio.username} Run`,
        description: `**Input:**
      ${userMsg}
      
      **Output:**
      ${output}`
      }]
    })

  }
}