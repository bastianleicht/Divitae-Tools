
// jshint esversion: 8
// jshint multistr: true 
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const config = require('../../opt/config.json');

const subreddits = [
    'memes',
    'DeepFriedMemes',
    'bonehurtingjuice',
    'surrealmemes',
    'dankmemes',
    'meirl',
    'me_irl',
    'funny'
];

module.exports.run = async (client, message, args) => {
    const url = `https://imgur.com/r/${subreddits[Math.floor(Math.random() * subreddits.length)]}/hot.json`;

    const data = await fetch(url).then(response => response.json()).then(body => body.data);
    const selected = data[Math.floor(Math.random() * data.length)];

    const embed = new MessageEmbed()
        .setTitle('Random Meme:')
        .setImage(`https://imgur.com/${selected.hash}${selected.ext.replace(/\?.*/, '')}`)
        .setColor(3447003)
        .setTimestamp()
        .setFooter(config.copyright);

    await message.channel.send(embed);

};

module.exports.help = {
    name: "meme",
    usage: "meme",
    description: "Sends a random meme.",
};