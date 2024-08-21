require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const fs = require('fs');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

let lastVersion = null;

// Load the last version from the file if it exists
if (fs.existsSync('lastVersion.txt')) {
    lastVersion = fs.readFileSync('lastVersion.txt', 'utf-8').trim();
}

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    checkForUpdates();
});

// Function to check for the latest version
const checkForUpdates = async () => {
    try {
        const response = await axios.get('http://setup.rbxcdn.com/version');
        const currentVersion = response.data.trim();

        // Check if there's a previous version stored and if the new version is different
        if (lastVersion && lastVersion !== currentVersion) {
            const channel = client.channels.cache.get('YOUR-CHANNEL-HERE');
            if (channel) {
                // Create the embed
                const embed = new EmbedBuilder()
                    .setTitle('🚨 New Roblox Version Released!')
                    .setColor(0x00FF00)
                    .setTimestamp()
                    .setFooter({ text: 'Roblox Version Tracker', iconURL: 'https://www.roblox.com/favicon.ico' })
                    .addFields(
                        { name: 'Previous Version', value: `\`\`${lastVersion}\`\``, inline: false },
                        { name: 'Current Version', value: `\`\`${currentVersion}\`\``, inline: true }
                    );
                channel.send({ embeds: [embed] });
            }
        }

        lastVersion = currentVersion;
        fs.writeFileSync('lastVersion.txt', currentVersion);
    } catch (error) {
        console.error('Error checking for updates:', error);
    }
};

// Check for updates every minute
setInterval(checkForUpdates, 60000);

client.login(process.env.DISCORD_TOKEN);
