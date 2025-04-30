
// jshint esversion: 8
// jshint multistr: true 
const Discord = require('discord.js');
const config = require('../opt/config.json');

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;
    let prefix = config.prefix;
    if (!message.content.startsWith(prefix)) return;

    if(args[0] == "help") {
        const error = new Discord.MessageEmbed()
            .setTitle(':warning: | Error')
            .addField('**Invalid Command Syntax!**', `Just do ${config.prefix}help instead.`)
            .setColor(0x8e44ad)
            .setTimestamp()
            .setFooter(config.copyright);
        return message.member.send(error);
    }

    if(args[0]) {
        let command = args[0];
        if(client.commands.has(command)) {
            command = client.commands.get(command);
            const embed = new Discord.MessageEmbed()
                .setTitle(client.user.username + ' Help')
                .setDescription(`The bot prefix is ` + '``' + `${config.prefix}` + '``' + `\n\n**Command:** ${command.help.name}\n**Description:** ${command.help.description || "No Description"}\n**Usage:** ${command.help.usage || "No Usage"}`)
                .setColor(3447003)
                .setTimestamp()
                .setFooter(config.copyright);
            message.channel.send(embed);
        }
    }
};

module.exports.help = {
    name: "help",
    usage: "help <command>",
    description: "",
};