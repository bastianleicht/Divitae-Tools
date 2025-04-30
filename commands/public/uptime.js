
// jshint esversion: 8
// jshint multistr: true 
const Discord = require('discord.js');
const ms = require('ms');
const config = require('../../opt/config.json');

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;
    
    const embed = new Discord.MessageEmbed()
        .setTitle('🕑 Uptime')
        .addField(`I'm online since:`, `${ms(client.uptime, { long: true })}`)
        // .setDescription(`My uptime is \`${ms(client.uptime, { long: true })}\``)
        .setThumbnail('http://static.routerabfrage.net/Clock.gif')
        .setColor(3447003)
        .setTimestamp()
        .setFooter(config.copyright);

    message.channel.send(embed);
};

module.exports.help = {
    name: "help",
    usage: "help <command>",
    description: "",
};