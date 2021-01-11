const Discord = require('discord.js'); // Load discord.js
const { Player } = require('discord-player'); // Load discord-player
const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);
const Enmap = require('enmap'); // Load enmap
const config = require('./config.js'); // Load config

const client = new Discord.Client({
    ws: {
        intents: config.intents,
    },
});

client.player = new Player(client); // Load player to client
client.config = config; // Load config to client
client.logger = require('./modules/Logger'); // Load logger to client

require('./modules/functions.js')(client); // Handy functions

client.commands = new Enmap(); // Create enmap collections
client.aliases = new Enmap();
client.settings = new Enmap({ name: 'settings' });

const init = async () => {
    // Load commands
    const cmdFiles = await readdir('./commands/');
    client.logger.log(`Loading a total of ${cmdFiles.length} commands.`);
    cmdFiles.forEach((f) => {
        if (!f.endsWith('.js')) return;
        const response = client.loadCommand(f);
        if (response) console.log(response);
    });

    // Load events
    const evtFiles = await readdir('./events/');
    client.logger.log(`Loading ${evtFiles.length} discord events.`);
    evtFiles.forEach((file) => {
        const eventName = file.split('.')[0];
        client.logger.log(`Loading Event: ${eventName}`);
        const event = require(`./events/${file}`);
        client.on(eventName, event.bind(null, client));
    });

    // Load player events
    const playerEvtFiles = await readdir('./playerEvents/');
    client.logger.log(`Loading ${playerEvtFiles.length} player events.`);
    playerEvtFiles.forEach((file) => {
        const eventName = file.split('.')[0];
        client.logger.log(`Loading Event: ${eventName}`);
        const event = require(`./playerEvents/${file}`);
        client.player.on(eventName, event.bind(null, client));
    });

    // Generate a cache of client permissions for pretty perm names in commands.
    client.levelCache = {};
    for (let i = 0; i < client.config.permLevels.length; i++) {
        const thisLevel = client.config.permLevels[i];
        client.levelCache[thisLevel.name] = thisLevel.level;
    }

    // Login to API
    client.login(client.config.token);
};

init();
