
// jshint esversion: 8
const Discord = require('discord.js');
const config = require('../../opt/config.json');

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;

    let embed = new Discord.MessageEmbed()
        .setTitle("🏓 Pong!")
        .setColor(3447003)
        .addField("Bot Latency", `${message.createdTimestamp - message.createdTimestamp}ms`, true)
        .addField("API Latency", `${Math.round(client.ws.ping)}ms`, true)
        .setTimestamp()
        .setFooter(config.copyright);

    message.channel.send(embed);
};

module.exports.help = {
    name: "ping",
    usage: "ping",
    description: "Shows you the Ping of the Bot and the Discord API.",
};