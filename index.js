var express = require('express');
const auth = require('./auth.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const MessageHandler = require('./message-handler');
const MaintenanceManager = require('./maintenance-manager');

var server = express();

server.listen(process.env.PORT || 80, () => {
    console.log(`Running webserver at http://localhost:${process.env.PORT || 80}/`);
});

client.on('ready', () => {
    console.log('client::ready');
    client.user.setStatus('online');
    client.user.setPresence({
        activity: {
            type: "WATCHING",
            name: '.commands'
        }
    });
});

client.on('message', msg => {
    console.log('client::message');
    MessageHandler.parseMessage(msg);
});

client.login(auth.discord_token);

MaintenanceManager.beginMaintenance(client);