# Infrabot ⚡
> Template 🏭 from [Getting started with Bolt for JavaScript tutorial][1]

## Overview

This is a Slack app built with the [Bolt for JavaScript framework][2] for the aggregation of workspace data

## Running locally

### 1. Setup environment variables

```zsh
# Replace with our signing secret and token
SLACK_SIGNING_SECRET=<your-signing-secret>
SLACK_BOT_TOKEN=<your-bot-token>
SLACK_LOG_LEVEL=debug
SLACK_REQUEST_LOG_ENABLED=2
PORT=3000
```

### 2. Setup your local project

```zsh
# Install the dependencies
npm i

# To run debug
npm run debug 
# To run production
npm start
```

### 3. Start servers

* [Download ngrok][3]
* open it and run `ngrok http 3000` to create a local requests URL for development.
* copy the https address (ex: https://4219dee485a5.ngrok.io)
* go to the Event Subscriptions page and enter in the address under "Request URL"
  * include /slack/events endpoint ex: https://4219dee485a5.ngrok.io/slack/events
  * make sure you check the server often as it will automatically stop after about an hour

[1]: https://slack.dev/bolt-js/tutorial/getting-started
[2]: https://slack.dev/bolt-js/
[3]: https://ngrok.com/download