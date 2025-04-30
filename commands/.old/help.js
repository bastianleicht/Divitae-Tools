
// jshint esversion: 8
// jshint multistr: true 
const Discord = require('discord.js');
const config = require('../opt/config.json');

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;
    let prefix = config.prefix;
    if (!message.content.startsWith(prefix)) return;

    const embed = new Discord.MessageEmbed()
        .setColor(3447003)
        .setTitle('Divitae Help')
        .addField('__Public Commands__:', `**${config.prefix}info** - Shows you some Info about the Bot.\n\
        **${config.prefix}ping** - Shows you the current Ping of the Bot.\n\
        **${config.prefix}avatar @user** - Shows you the Avatar of the specified user and a Link to it.\n\
        **${config.prefix}corona <Country>** - Shows You the actual Corona Statistics.\n\
        **${config.prefix}meme** - Sends a random Meme.\n\
        **${config.prefix}serverinfo** - Shows you the Server's Information.\n\
        **${config.prefix}hug @user** - Allows you to hug another User.\n\
        **${config.prefix}userinfo @user** - Shows advanced infos off that User.\n\
        **${config.prefix}coinflip** - Flip the Coin!\n\
        **${config.prefix}love @user** - Measure the Love level!!\n\
        **${config.prefix}instagram <username> - Find out some nice instagram statistics`)
        .addField('__Team Commands__:', `**${config.prefix}partner <Discord Link> @user <Team Name>** - Sends a Partner Message in the current Channel.\n\
        **${config.prefix}clear <number>** - Cleares the specified number of messages.\n\
        **${config.prefix}giveaway <Channel> <Duration> <Winners> <Name>** - Creates a Giveaway for You!\n\
        **${config.prefix}reroll <Giveaway ID>** - Rerolls an ended Giveaway.\n\
        **${config.prefix}setrules <de, en>** - Sends the actual rules.`)
        .setTimestamp()
        .setFooter(config.copyright);

    message.author.send(embed);
};

module.exports.help = {
    name: "help",
    usage: "help <command>",
    description: "",
};