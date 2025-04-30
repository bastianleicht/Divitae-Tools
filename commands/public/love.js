
// jshint esversion: 8
// jshint multistr: true 
const { MessageEmbed } = require('discord.js');
const config = require('../../opt/config.json');

module.exports.run = async (client, message, args) => {

    if(!message.mentions.members.first()) {
        const embed = new MessageEmbed()
            .setTitle(':warning: | Error')
            .addField('**Invalid Command Syntax!** Please use:', `${config.prefix}love <Member>`)
            .setColor(0x8e44ad)
            .setTimestamp()
            .setFooter(config.copyright);
        return message.member.send(embed);
    } else {
        const love = Math.random() * 100;
        const loveIndex = Math.floor(love / 10);
        const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

        const embed = new MessageEmbed()
            .setTitle(`Love Match 💕`)
            .addField('Names', `<@${message.author.id}> and <@${message.mentions.users.first().id}>`)
            .addField(`Score`, `Your love score is: ${Math.floor(love)}%\n\n${loveLevel}`)
            .setThumbnail('https://media3.giphy.com/media/2voGcsEiAQUc2kn4sA/giphy.gif')
            .setColor("#ffb6c1")
            .setTimestamp()
            .setFooter(config.copyright);

        await message.channel.send(embed);
    }
    
};

module.exports.help = {
    name: "love",
    usage: "love <@user>",
    description: "Measures the love between you and the mentioned User.",
};