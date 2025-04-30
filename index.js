//jshint esversion: 8

//  Discord
const Discord = require("discord.js");
const client = new Discord.Client();

//  Command Handler
const fs = require('fs');
const Enmap = require('enmap');
client.commands = new Enmap();
client.events = new Enmap();

//  Web Server Stuff
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const passport = require("passport");
const bodyParser = require("body-parser");
const flash = require("connect-flash");

const app = express();


//  Client Config
const config = require('./opt/config.json');
client.config = config;

//  Youtube Notifier
const YouTubeNotifier = require('youtube-notification');
const notifier = new YouTubeNotifier({
    hubCallback: `http://dvt.routerabfrage.net:${config.webserver.port}/youtube`, //TODO needs an actual url https://example.com/youtube maybe with instant IP implementation
    port: config.webserver.port,
    path: '/youtube'
});

//  GiveawaysManager Settings
const { GiveawaysManager } = require('discord-giveaways');
client.GiveawaysManager = new GiveawaysManager(client, {
    storage: "./opt/giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});

console.log('------------------------------------------------');

fs.readdir('./events/', (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
     if (!file.endsWith('.js')) return;
     const evt = require(`./events/${file}`);
     let evtName = file.split('.')[0];
     console.log(`Loaded event '${evtName}'`);
     client.events.set(evtName);
     client.on(evtName, evt.bind(null, client));
    
    });
    console.log('------------------------------------------------');
});

fs.readdir('./commands/', async (err, files) => {
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        let props = require(`./commands/${file}`);
        let cmdName = file.split('.')[0];
        console.log(`Loaded Test Command's '${cmdName}'`);
        client.commands.set(cmdName, props);

    });
    console.log('------------------------------------------------');
});

fs.readdir('./commands/owner/', async (err, files) => {
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        let props = require(`./commands/owner/${file}`);
        let cmdName = file.split('.')[0];
        console.log(`Loaded Owner Command '${cmdName}'`);
        client.commands.set(cmdName, props);

    });
    console.log('------------------------------------------------');
});

fs.readdir('./commands/team/', async (err, files) => {
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        let props = require(`./commands/team/${file}`);
        let cmdName = file.split('.')[0];
        console.log(`Loaded Team Command '${cmdName}'`);
        client.commands.set(cmdName, props);

    });
    console.log('------------------------------------------------');
});

fs.readdir('./commands/public/', async (err, files) => {
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        let props = require(`./commands/public/${file}`);
        let cmdName = file.split('.')[0];
        console.log(`Loaded Public Command '${cmdName}'`);
        client.commands.set(cmdName, props);

    });
    console.log('------------------------------------------------');
});

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

notifier.on('notified', data => {
  console.log('New Video');
  client.channels.cache.get(config.youtubenotify.serverchannel).send(
    `**${data.channel.name}** just uploaded a new video - **${data.video.link}**`
  );
});
 
notifier.subscribe(config.youtubenotify.ytchannels);
app.use("/youtube", notifier.listener());


require('./web/helpers/passport')(passport); //pass passport for configuration

//set up our express application
app.use(morgan('dev')); //log every request to the console
app.use(cookieParser()); //read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs'); //set up ejs for templating

//required for passport
app.use(session({
    secret: 'this_is_a_super_secret_session_sescret_._you_should_change_this',
    resave: true,
    saveUninitialized: true,
})); //session secret

app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions
app.use(flash()); //use connect-flash for flash messages stored in session

app.use('/static', express.static('views/static'));

require('./web/routes.js')(app, passport); //load our routes and pass in our app and fully configured passport


app.listen(config.webserver.port);
client.login(config.token2 || process.env.TOKEN);