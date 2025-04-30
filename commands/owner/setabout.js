
// jshint esversion: 8
const Discord = require('discord.js');
const config = require('../../opt/config.json');

exports.run = async (client, message, args) => {

    if (message.author.bot) return;
    if (message.channel == 'dm') return;

    let test = ":Twitter:";

    if (message.member.id === config.owner || message.member.hasPermission('ADMINISTRATOR')) {
        if (args[0] == "de") {
            await message.delete().catch(O_o => {});
            const embed = new Discord.MessageEmbed()
                .setTitle('Team Divitae - Über uns')
                .setDescription(`Wir sind **Divitae eSports**, ein in Deutschland operierendes eSports-Team, das derzeit in Fortnite, Valorant, Rainbow 6 Siege und Overwatch vertreten ist.\n\n Divitae wurde am 25.03.2020 gegründet und ist stets auf der suche nach neuen Membern!`)
                .addField('\n__Social Media:__', `\n[Divitae eSports on Twitter](https://twitter.com/DivitaeEU)
                [Divitae eSports on Youtube](https://www.youtube.com/channel/UCtCfYsCV1xUZ-LKVq4lYWpQ)
                [Divitae eSports on Instagram](https://www.instagram.com/teamdivitae/)
                [Divitae eSports Website](https://divitae.eu/)
                \n[Click here to apply for our team](https://divitae.eu/team-application-2/)
                \nContact via Email - contact@divitae.eu`)
                .setColor(0xdf5824)
                .setTimestamp()
                .setFooter(config.copyright);
            message.channel.send(embed); //.then(n => n.react('✋')).catch(console.error);

        } else if (args[0] == "en") {
            await message.delete().catch(O_o => {});
            const embed = new Discord.MessageEmbed()
                .setTitle('Team Divitae - About us')
                .setDescription(``)
                .setColor(0xdf5824)
                .setTimestamp()
                .setFooter(config.copyright);
            message.channel.send(embed); //.then(n => n.react('✋')).catch(console.error);

        } else if (args[0] !== 'de' || args[0] !== 'en') {
            await message.delete().catch(O_o => {});
            const embed = new Discord.MessageEmbed()
                .setTitle(':warning: | Error')
                .addField('**Invalid Command Syntax!** Please use:', `${config.prefix}setabout <Language>`)
                .addField('__Available Languages:__', 'de, en')
                .setColor(0x8e44ad)
                .setTimestamp()
                .setFooter(config.copyright);
            message.member.send(embed).then(msg => {
                msg.delete({
                    timeout: 10000
                }); // Deletes Message after 10seconds
            }).catch(console.error); // Logs the error if there is one 
        }
    } else {
        await message.delete().catch(O_o => {});
        const embed = new Discord.MessageEmbed()
            .setTitle('Missing Permission')
            .setDescription(`I'm sorry but you don't have the **ADMINISTRATOR** Permission`)
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter(config.copyright);
        message.member.send(embed).then(msg => {
            msg.delete({
                timeout: 10000
            }); // Deletes Message after 10seconds
        }).catch(console.error); // Logs the error if there is one
    }

};
exports.help = {
    name: 'setabout'
};