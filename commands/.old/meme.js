
// jshint esversion: 8
// jshint multistr: true 
const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const config = require('../../opt/config.json');


module.exports.run = async (client, message, args) => {
    const url = 'https://some-random-api.ml/meme';

    let data, response;
    try {
        response = await axios.get(url);
        data = response.data;
    } catch (e) {
        return message.channel.send(`An error has occured, try again!`);
    }

    const embed = new MessageEmbed()
        .setTitle(`Random Meme: `)
        .setDescription(data.caption)
        .setColor(3447003)
        .setImage(data.image)
        .setTimestamp()
        .setFooter(config.copyright);

    await message.channel.send(embed);
};

module.exports.help = {
    name: "meme",
    usage: "meme",
    description: "Sends a random meme.",
};