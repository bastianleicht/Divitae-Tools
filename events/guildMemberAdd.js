
// jshint esversion: 8
const Discord = require("discord.js");
const config = require("../opt/config.json");

module.exports = async (client) => {

    // Main Discord
    console.log(`Member Count in Main Updated to ` + client.guilds.cache.get(config.serverstats.main.serverID).memberCount);
    try {
        //client.channels.cache.get(config.serverstats.main.channel).setName(`All Members: ${client.guilds.cache.get(config.serverstats.main.serverID).memberCount}`);
    } catch (error) {
        console.log(error);
    }

    //Valorant Discord
    console.log(`Member Count in Valorant Updated to ` + client.guilds.cache.get(config.serverstats.valorant.serverID).memberCount);
    try {
        // client.channels.cache.get(config.serverstats.valorant.channel).setName(`All Members: ${client.guilds.cache.get(config.serverstats.valorant.serverID).memberCount}`);
    } catch (error) {
        console.log(error);
    }



    // client.guild.channels.cache.get(config.serverstats.member).setName(`Members: ${client.guild.members.cache.filter(m => !m.user.bot).size}`);
    // client.guild.channels.cache.get(config.serverstats.bots).setName(`Bots: ${client.guild.members.cache.filter(m => m.user.bot).size}`);
};