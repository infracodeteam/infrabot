const config = require("dotenv").config();
const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  logLevel: process.env.SLACK_LOG_LEVEL,
});

// TODO: Set an interval to run @ 8am ET that saves this data somewhere and resets counts to 0 and empties user arrays.
const posts = {};

app.message(async ({ message, client }) => {
  if (message.subtype !== "message") return;
  if (posts[message.channel] == null) {
    const channel_info = await client.conversations.info({
      channel: message.channel
    });
    posts[message.channel] = {count: 0, users: [], channel_name: channel_info.name || message.channel};
  }
  posts[message.channel].count++;
  if (posts[message.channel].users.some(u => u === message.user) === false) {
    posts[message.channel].users.push(message.user);
  }
  console.log(`posts`, posts);
  // {
  //   C01T0PLMGEL: { count: 4, users: [ 'U01CL9LQDEF', 'U01D8QYUW72' ], channel_name: 'C01T0PLMGEL' },
  //   C01CAT52YVC: { count: 1, users: [ 'U01CL9LQDEF' ], channel_name: 'C01CAT52YVC' }
  // }
  
});

// app.event('team_join', async ({user, client}) => {
//   newUserCount++;
// });

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Slack bot (Bolt) app is running!');
})();