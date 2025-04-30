
// jshint esversion: 8
const config = require("../opt/config.json");

module.exports = (client) => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log("Running " + client.user.username + " Communication Server " + config.webserver.version);
    console.log(`The magic happens on port ${config.webserver.port}`);

    client.user.setActivity(`${config.prefix}help | Divitae Tools ${config.version}`, {
        type: "PLAYING"
    });
};