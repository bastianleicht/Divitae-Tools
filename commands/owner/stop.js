
// jshint esversion: 8
const Discord = require('discord.js');
const config = require('../../opt/config.json');

exports.run = async (client, message, args) => {

    if (message.author.id != config.owner) return;

    try {
        await message.channel.send("Bot is shutting down!");
        process.exit();
    } catch(e) {
        message.channel.send(`ERROR: ${e.message}`);
    }

    

};

exports.help = {
    name: "stop"
};