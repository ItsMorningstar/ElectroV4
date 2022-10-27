const { readdirSync } = require("fs");
const path = require("path");
const eventsDir = path.join(__dirname, "../events");
module.exports = (client) => {
  const events = readdirSync(eventsDir);
  for (let event of events) {
    let file = require(`../events/${event}`);
    client.on(event.split(".")[0], (...args) => file(client, ...args));
  }
};
