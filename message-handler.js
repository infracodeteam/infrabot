class MessageHandler {
    constructor() {}
    parseMessage(msg) {
        if (msg.channel == null || msg.author == null) return;
        let user_id = msg.author.id;
        let username = msg.author.username;
        let channel_id = msg.channel.id;
        let date = Math.floor((new Date()).getTime() / 1000);
        console.log('user_id :>> ', user_id);
        console.log('username :>> ', username);
        console.log('channel_id :>> ', channel_id);
        console.log('date :>> ', date);
    }
}
module.exports = new MessageHandler();