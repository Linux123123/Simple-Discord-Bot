import Enmap from 'enmap';
import fs from 'fs';
import reader from 'readline-sync';
import { defaultSettings } from './modules/functions';

let baseConfig = fs.readFileSync('../config.js.example', 'utf8');

const settings = new Enmap({
    name: 'settings',
    cloneLevel: 'deep',
    ensureProps: true,
});

(async function () {
    if (fs.existsSync('./config/config.js')) {
        console.log('Already been set up!');
        process.exit(0);
    }
    console.log('Setting Up Configuration...');
    await settings.defer;

    console.log(
        'First Start! Inserting default guild settings in the database...'
    );
    settings.set('default', defaultSettings);

    console.log('Enter your discord API token: ');
    const TOKEN = reader.question('');

    baseConfig = baseConfig.replace('TOKEN', `${TOKEN}`);

    fs.writeFileSync('./config/config.js', baseConfig);
    console.log('REMEMBER TO NEVER SHARE YOUR TOKEN WITH ANYONE!');
    console.log('Configuration has been written, enjoy!');
    await settings.close();
})();
