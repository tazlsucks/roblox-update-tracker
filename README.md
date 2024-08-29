# Roblox Version Tracker

a Discord bot to track the latest Roblox update.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 16.6.0 or higher)

- Discord.js (version 14 or higher)

- A Discord bot token (you can get one from the [Discord Developer Portal](https://discord.dev/))

## Setup

1. Clone the Repository:
   
   ```bash
   git clone https://github.com/your-username/roblox-version-tracker-bot.git
   cd roblox-version-tracker-bot
   ```

2. Install Dependencies:
   
   Make sure you have Node.js installed, then install the required packages.
   
   ```bash
   npm install
   ```

3. Create a .env file:
   
   Add your Discord bot's token
   
   ```env
   DISCORD_TOKEN=your-discord-bot-token
   ```

4. Add your channel ID:
   
   Update the code in ```index.js``` to set the channel the bot should send updates to.
   
   ```js
   const channel = client.channels.cache.get('YOUR-CHANNEL-HERE'); // Replace 'YOUR-CHANNEL-HERE' with your actual channel ID
   ```

5. Run the bot
   
   ```bash
   node index.js
   ```

yay you did it



To keep your bot running 24/7, use a bot hosting provider or like a spare laptop or something idk


