
// 2020-04-17 Bot Creation Date
// jshint esversion: 8
// jshint multistr: true 
const { MessageEmbed, version: djsversion } = require("discord.js");
const { utc } = require('moment');
const os = require('os');
const ms = require("ms");
const config = require('../../opt/config.json');

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
}

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;

    const core = os.cpus()[0];
    const embed = new MessageEmbed()
        .setTitle(client.user.username + ' Info')
        .addField('General', [
            `**❯ Client:** ${client.user.tag} (${client.user.id})`,
            `**❯ Commands:** ${client.commands.size}`,
            `**❯ Events:** ${client.events.size}`,
            `**❯ Servers:** ${client.guilds.cache.size.toLocaleString()} `,
            `**❯ Users:** ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`,
            `**❯ Channels:** ${client.channels.cache.size.toLocaleString()}`,
            `**❯ Creation Date:** ${utc(client.user.createdTimestamp).format('Do MMMM YYYY HH:mm:ss')}`,
            `**❯ Uptime:** ${ms(client.uptime, { long: true })}`,
            `**❯ Node.js:** ${process.version}`,
            `**❯ Bot Version:** ${config.version}`,
            `**❯ WebServer Version:** ${config.webserver.version}`,
            `**❯ Discord.js:** v${djsversion}`,
            '\u200b'
        ])
        .addField('System', [
            `**❯ Platform:** ${process.platform}`,
            `**❯ Uptime:** ${ms(os.uptime() * 1000, { long: true })}`,
            `**❯ CPU:**`,
            `\u3000 Cores: ${os.cpus().length}`,
            `\u3000 Model: ${core.model}`,
            `\u3000 Speed: ${core.speed}MHz`,
            `**❯ Memory:**`,
            `\u3000 Total: ${formatBytes(process.memoryUsage().heapTotal)}`,
            `\u3000 Used: ${formatBytes(process.memoryUsage().heapUsed)}`
        ])
        .setThumbnail(client.user.displayAvatarURL())
        .setColor(3447003)
        .setTimestamp()
        .setFooter(config.copyright);

    message.channel.send(embed);

    // const embed = new Discord.MessageEmbed()
    //     .setColor(3447003)
    //     .setTitle(`${client.user.username} Info`)
    //     .addField('__Bot Info__:', 'Dieser Bot wird seit dem 17.04.2020 von <@350618993020764161> programmiert und seitdem dauerhaft weiterentwickelt. Falls **Du** noch irgendwelche Features in dem Bot vermisst schreib <@350618993020764161> doch mal mit deinem Vorschlag an.')
    //     .setTimestamp()
    //     .setFooter(config.copyright);

    // message.author.send(embed);
};

module.exports.help = {
    name: "info",
    usage: "info",
    description: "Shows you some Infos about the Bot!",
};