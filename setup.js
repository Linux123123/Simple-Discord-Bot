const Enmap = require('enmap');
const fs = require('fs');
const prompt = require('prompt-sync')({ sigint: true });

let baseConfig = fs.readFileSync('./config.js.example', 'utf8');
let TOKEN;

const defaultSettings = {
    prefix: '!',
    modLogChannel: 'mod-log',
    modRole: 'Moderator',
    adminRole: 'Administrator',
    systemNotice: 'true',
    welcomeChannel: 'welcome',
    welcomeMessage:
        'Say hello to {{user}}, everyone! We all need a warm welcome sometimes :D',
    welcomeEnabled: 'false',
};

const settings = new Enmap({
    name: 'settings',
    cloneLevel: 'deep',
    ensureProps: true,
});

(async function () {
    console.log('Setting Up GuideBot Configuration...');
    await settings.defer;

    console.log(
        'First Start! Inserting default guild settings in the database...'
    );
    await settings.set('default', defaultSettings);

    const TOKEN = prompt('Enter your discord API token: ');

    baseConfig = baseConfig.replace('TOKEN', `${TOKEN}`);

    fs.writeFileSync('./config.js', baseConfig);
    console.log('REMEMBER TO NEVER SHARE YOUR TOKEN WITH ANYONE!');
    console.log('Configuration has been written, enjoy!');
    await settings.close();
})();
