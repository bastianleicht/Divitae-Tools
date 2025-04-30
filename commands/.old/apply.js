
// jshint esversion: 8
const Discord = require('discord.js');
const { application, prefix } = require("../config.json");

module.exports.run = (client, message) => {
    const questions = application.questions;
    const replys = [];
    var d = new Date(),
    dformat = [d.getMonth()+1,
               d.getDate(),
               d.getFullYear()].join('/')+' '+
              [d.getHours(),
               d.getMinutes(),
               d.getSeconds()].join(':'); //         dd/mm/yyyy hh:mm:ss

    if(message.channel.id !== application.applychannel) return message.channel.send(`⚠ Please use that command in the <#${application.applychannel}> channel!`);
    if(message.author.bot) return;

    const embed = new Discord.MessageEmbed()
    .setDescription(`Application started in DM by ${message.author}`);
    message.channel.send(embed);

    function sendNextQuestion(index) {
        
        return message.member.send(questions[index])
            .then(dmMessage => dmMessage.channel.awaitMessages(() => true, { max: 1, /*time: 60000,*/ errors: ["time"] }))
            .then(reply => {
                const content = reply.first().content;
                if (content === prefix + "cancel") throw new Error("Self-Cancel");
                if (content === prefix + "redo") {
                    replys.length = 0;
                    return sendNextQuestion(0);
                }

                replys.push(reply.first().content);
                return index >= questions.length - 1 ? new Promise(res => res()) : sendNextQuestion(index + 1);
            }).catch(err => {
                if (err.toString() === "Error: Self-Cancel") {
                    //this means they cancled it 
                }

                message.member.send("Application Canceled");
            });
    }

    sendNextQuestion(0).then(() => {
        message.member.send("Danke für deine Bewerbung, ein Teammitglied wird sie demnächst bearbeiten!");
        const channel = message.guild.channels.cache.find(f => f.id === application.channelId);

        const embed = new Discord.MessageEmbed()
        .setColor("#FF0000")
        .setDescription(`----------NEW-Member---------- 
        \n${questions[0]} - \n${replys[0]}
        \n${questions[1]} - \n${replys[1]}
        \n${questions[2]} - \n${replys[2]}
        \n${questions[3]} - \n${replys[3]}
        \n${questions[4]} - \n${replys[4]}
        \n${questions[5]} - \n${replys[5]}
        \n${questions[6]} - \n${replys[6]}
        \n${questions[7]} - \n${replys[7]}
        \n${questions[8]} - \n${replys[8]}
        \n${questions[9]} - \n${replys[9]}
        \n${questions[10]} - \n${replys[10]}
        \n${questions[11]} - \n${replys[11]}
        \n${questions[12]} - \n${replys[12]}
        \nDate of Application: ${dformat}
        Name of Applicant: ${message.author}`);

       channel.send(embed);
    });

};

module.exports.props = {
    name: "apply"
};