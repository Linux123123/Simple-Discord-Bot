import fs from 'fs';
import reader from 'readline-sync';
import { config } from './config/config';

let baseConfig = fs.readFileSync(`${__dirname}/config/config.js`, 'utf8');
let baseSrcConfig = fs.readFileSync(
    `${__dirname}/../src/config/config.ts`,
    'utf8'
);

if (config.token === 'DCAPIKEY') {
    console.log('Enter your discord API token: ');
    const TOKEN = reader.question('');
    baseConfig = baseConfig.replace('DCAPIKEY', `${TOKEN}`);
    baseSrcConfig = baseSrcConfig.replace('DCAPIKEY', `${TOKEN}`);
}

fs.writeFileSync(`${__dirname}/config/config.js`, baseConfig);
fs.writeFileSync(`${__dirname}/../src/config/config.ts`, baseSrcConfig);
