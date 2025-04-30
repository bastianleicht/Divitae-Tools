
// jshint esversion: 8
// jshint multistr: true 
const ms = require('ms');

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('You are not allowed to start giveaways');

    let channel = message.mentions.channels.first();

    if (!channel) return message.channel.send('Please provide a channel');

    let giveawayDuration = args[1];

    if (!giveawayDuration || isNaN(ms(giveawayDuration))) return message.channel.send('Pleae provide a valid duration');

    let giveawayWinners = args[2];

    if (isNaN(giveawayWinners) || (parseInt(giveawayWinners) <= 0)) return message.channel.send('Please provide a valid number of winners!');

    let giveawayPrize = args.slice(3).join(" ");

    if (!giveawayPrize) return message.channel.send('Ok then, I\'ll give away nothing');

    client.GiveawaysManager.start(channel, {
        time: ms(giveawayDuration),
        prize: giveawayPrize,
        winnerCount: giveawayWinners,
        hostedBy: client.config.giveaway.hostedBy ? message.author : null,

        messages: {
            giveaway: (client.config.giveaway.everyoneMention ? "@everyone\n\n" : "") + "✅ **NEW GIVEAWAY STARTED** ✅",
            giveawayEnded: (client.config.giveaway.everyoneMention ? "@everyone\n\n" : "") + "⚠️ **GIVEAWAY ENDED** ⚠️",
            timeRemaining: "Time remaining: **{duration}**",
            inviteToParticipate: "React with 🎉 to enter",
            winMessage: "Congrats {winners}, you won **{prize}**",
            embedFooter: "Giveaway time!",
            noWinner: "Couldn't determine a winner",
            hostedBy: "Hosted by {user}",
            winners: "winner(s)",
            endedAt: "Ends at",
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false
            }
        }
    });
    message.channel.send(`Giveaway starting in ${channel}`);
};

module.exports.help = {
    name: "giveaway",
    usage: "giveaway <#channel> <duration> <winners> <prize>",
    description: "Generates a giveaway",
};