
// jshint esversion: 8
// jshint multistr: true 
const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const config = require('../../opt/config.json');

module.exports.run = async (client, message, args) => {

    if(!message.mentions.members.first()) {
        const embed = new MessageEmbed()
            .setTitle(':warning: | Error')
            .addField('**Invalid Command Syntax!** Please use:', `${config.prefix}hug <Member>`)
            .setColor(0x8e44ad)
            .setTimestamp()
            .setFooter(config.copyright);
        return message.member.send(embed);
    } else {
        const url = 'https://some-random-api.ml/animu/hug';

        let response, data;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return message.channel.send(`An error occured!`);
        }

        const embed = new MessageEmbed()
            .setTitle('Hug ❤')
            .setDescription(`<@${message.author.id}> hugs <@${message.mentions.users.first().id || message.mentions.members.first()}>`)
            .setImage(data.link)
            .setColor(3447003)
            .setTimestamp()
            .setFooter(config.copyright);

        await message.channel.send(embed);
    }
    
};

module.exports.help = {
    name: "hug",
    usage: "hug @user",
    description: "Hug's a User for you!",
};