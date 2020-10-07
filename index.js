const auth = require('./auth.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const MessageHandler = require('./message-handler');
const MaintenanceManager = require('./maintenance-manager');
const DBM = require('./sqlite_db');
const msgHandler = new MessageHandler(DBM);
const maintManager = new MaintenanceManager(DBM);

client.on('ready', () => {
    console.log('client::ready');
    client.user.setStatus('online');
    client.user.setPresence({
        activity: {
            type: "UNDER",
            name: 'CONSTRUCTION'
        }
    });
});

client.on('message', msg => {
    console.log('client::message');
    msgHandler.parseMessage(msg);
});

client.login(auth.discord_token);

maintManager.beginMaintenance(client);