
// jshint esversion: 8
// jshint multistr: true 
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

const fetch = require("node-fetch");
const config = require("../../opt/config.json");

module.exports.run =  async (client, message, args) => {


    const name = args.join(" ");

    if (!name) {
        const embed = new MessageEmbed()
            .setTitle(':warning: | Error')
            .addField('**Invalid Command Syntax!** Please use:', `${config.prefix}instagram <username>`)
            .setColor(0x8e44ad)
            .setTimestamp()
            .setFooter(config.copyright);
        return message.member.send(embed);
    }

    const url = `https://instagram.com/${name}/?__a=1`;

    let res;

    try {
        res = await fetch(url).then(url => url.json());
    } catch (e) {
        return message.reply("I couldn't find that account... :(")
            .then(m => m.delete(5000));
    }

    const account = res.graphql.user;

    const embed = new MessageEmbed()
      .setColor("bc2a8d")
      .setTitle(account.full_name)
      .setURL(`https://instagram.com/${name}`)
      .setThumbnail(account.profile_pic_url_hd)
      .addField(
        "Profile information",
        stripIndents`**- Username:** ${account.username}
        **- Full name:** ${account.full_name}
        **- Biography:** ${account.biography.length == 0 ? "none" : account.biography}
        **- Posts:** ${account.edge_owner_to_timeline_media.count}
        **- Followers:** ${account.edge_followed_by.count}
        **- Following:** ${account.edge_follow.count}
        **- Private account:** ${account.is_private ? "Yes 🔐" : "Nope 🔓"}`
      );

    message.channel.send(embed);
};

module.exports.help = {
    name: "instagram",
    usage: "instagram <username>",
    description: "Shows you some info about the User's Profile.",
};