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
        const response = await axios.get('https://clientsettingscdn.roblox.com/v2/client-version/WindowsPlayer/channel/LIVE');
        const data = response.data;

        const clientVersionUpload = data.clientVersionUpload;

        if (lastVersion && lastVersion !== clientVersionUpload) {
            // put the channel you want updates to go to, yeah
            const channel = client.channels.cache.get('YOUR-CHANNEL-HERE');
            if (channel) {
                const embed = new EmbedBuilder()
                    .setTitle('Roblox Update')
                    .setColor(16711680)
                    .setTimestamp()
                    .setFooter({ text: 'Roblox Version Tracker', iconURL: 'https://roblox.com/favicon.ico' })
                    .setDescription('Roblox has updated.')
                    .addFields(
                        { name: 'Previous Version', value: `\`\`${lastVersion}\`\``, inline: true },
                        { name: 'Current Version', value: `\`\`${clientVersionUpload}\`\``, inline: true }
                    );
                channel.send({ embeds: [embed] });
            }
        }

        lastVersion = clientVersionUpload;
        fs.writeFileSync('lastVersion.txt', clientVersionUpload);
    } catch (error) {
        console.error('Error checking for updates:', error);
    }
};

// Check for updates every minute
setInterval(checkForUpdates, 60000);

client.login(process.env.DISCORD_TOKEN);
