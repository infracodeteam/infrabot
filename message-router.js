const GeneralMessageHandler = require('./interactions/general-commands.js');
const request = require('request');
const ChannelManager = require('./interactions/channel-manager.js');
const BotTalk = require('./interactions/bot-talk.js');
const { Channel } = require('discord.js');

class MessageRouter {
    constructor() {}
    handleMessage(msg, client) {
        if (msg.author.bot) return;
        if (msg.channel.type !== 'dm') {
            if (msg.channel.id === '687422495342460958') {
                return ChannelManager.checkTicker(msg);
            }
            if (msg.channel.id === '721424735317262376') {
                msg.delete();
            }
        
            if (msg.mentions.has('683138332863103172') && !msg.mentions.everyone) 
                BotTalk.handleMessage(msg);
        
            if (msg.content.substring(0, 1) === '.' && msg.content.substring(1, 2) !== '.') {
                return GeneralMessageHandler.handleMessage(msg);
            }
        }
        if (msg.channel.type === 'dm') {
            this.handleDirectMessage(msg, client);
        }
    }

    handleDirectMessage(msg, client) {
        if (msg.author.id !== '305030099617447938') return console.dir('no');
        let words = msg.content.split(' ');
        var postInChannel = () => {
            // post channel_id - content
            let channel = client.channels.cache.get(words[1]);
            if (channel) {
                let content = msg.content.split('-');
                channel.send(content[1]);
            }
        };
        var deletePost = () => {
            // delete message_id from channel_id
            client.channels.fetch(words[3]).then(channel => {
                channel.messages.fetch().then(messages => {
                    if (messages.get(words[1]))
                        messages.find(x => {return x.id === words[1]}).delete();
                });
            });
        }
        switch (words[0]) {
            case 'delete':
                deletePost();
                break;
            case 'post':
                postInChannel();
                break;
        }
    }

    postToFlow(params, client) {
        ChannelManager.postToFlow(params, client);
    }
}
module.exports = new MessageRouter();