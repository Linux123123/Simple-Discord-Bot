"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enmap_1 = __importDefault(require("enmap"));
const fs_1 = __importDefault(require("fs"));
const readline_sync_1 = __importDefault(require("readline-sync"));
const functions_1 = require("./modules/functions");
let baseConfig = fs_1.default.readFileSync('../config.js.example', 'utf8');
const settings = new enmap_1.default({
    name: 'settings',
    cloneLevel: 'deep',
    ensureProps: true,
});
(async function () {
    if (fs_1.default.existsSync('./config/config.js')) {
        console.log('Already been set up!');
        process.exit(0);
    }
    console.log('Setting Up Configuration...');
    await settings.defer;
    console.log('First Start! Inserting default guild settings in the database...');
    settings.set('default', functions_1.defaultSettings);
    console.log('Enter your discord API token: ');
    const TOKEN = readline_sync_1.default.question('');
    baseConfig = baseConfig.replace('TOKEN', `${TOKEN}`);
    fs_1.default.writeFileSync('./config/config.js', baseConfig);
    console.log('REMEMBER TO NEVER SHARE YOUR TOKEN WITH ANYONE!');
    console.log('Configuration has been written, enjoy!');
    await settings.close();
})();
