
// jshint esversion: 8
const Discord = require('discord.js');
const config = require('../../opt/config.json');

exports.run = async (client, message, args) => {

    if(message.author.id != config.owner) return;

    if(!args[0]) return message.channel.send("Please provide a command to reload!");
    let commandName = args[0].toLowerCase();

    try {
        delete require.cache[require.resolve(`./${commandName}.js`)];
        client.commands.delete(commandName);
        const pull = require(`./${commandName}.js`);
        client.commands.set(commandName, pull);
    } catch(e) {
        return message.channel.send(`Could not reload: \`${args[0].toUpperCase()}\``);
    }

    message.channel.send(`The Command \`${args[0].toUpperCase()}\` has been reloaded!`);

};

exports.help = {
    name: "reload"
};