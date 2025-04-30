
// jshint esversion: 8
// jshint multistr: true 
const Discord = require('discord.js');
const config = require('../../opt/config.json');

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;

    var choices = [
        "Kopf",
        "Zahl"
    ];

    var output = choices[Math.floor(Math.random()*choices.length)];

    const embed = new Discord.MessageEmbed()
        .setColor(3447003)
        .setTitle('Coinflip')
        .setDescription(`Du hast ${output}`)
        .setImage('https://static.routerabfrage.net/coinflip.gif')
        .setTimestamp()
        .setFooter(config.copyright);

    message.channel.send(embed);
};

module.exports.help = {
    name: "coinflip",
    usage: "coinflip",
    description: "Does a random coinflip.",
};