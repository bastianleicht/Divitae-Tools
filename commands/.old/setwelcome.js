
// jshint esversion: 8
const Discord = require('discord.js');

exports.run = async (client, message, args) => {

    await message.delete().catch(O_o => {});
    if (message.author.bot) return;

    if (message.member.hasPermission('ADMINISTRATOR')) {

        const a = message.guild.roles.cache.get('703919314801262592'); // Valorant
        const b = message.guild.roles.cache.get('703919347948584990'); // Fortnite
        const c = message.guild.roles.cache.get('703919383180869663'); // LoL

        const embed = new Discord.MessageEmbed()
            .setTitle('Available Roles')
            .setDescription(`
        
            Welcome to **${message.guild.name}**! You may choose from our list of roles you can join/leave from:

        🇦 ${a.toString()}
        🇧 ${b.toString()}
        🇨 ${c.toString()}
        
        `)
            .setColor(0xdd9323)
            .setFooter(`Guild ID: ${message.guild.id}`);

        message.channel.send(embed).then(async msg => {

            await msg.react('🇦');
            await msg.react('🇧');
            await msg.react('🇨');
        });
    } else {
        return message.channel.send(':no_entry: You are not an Administrator!');
    }
};

exports.help = {
    name: 'setwelcome'
};