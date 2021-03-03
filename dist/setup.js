"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const readline_sync_1 = __importDefault(require("readline-sync"));
const config_1 = require("./config/config");
if (config_1.config.token !== 'TOKEN')
    process.exit(0);
let baseConfig = fs_1.default.readFileSync(`${__dirname}/config/config.js`, 'utf8');
let baseSrcConfig = fs_1.default.readFileSync(`${__dirname}/../src/config/config.ts`, 'utf8');
console.log('First Start!');
console.log('Setting Up Configuration...');
console.log('Enter your discord API token: ');
const TOKEN = readline_sync_1.default.question('');
baseConfig = baseConfig.replace('TOKEN', `${TOKEN}`);
baseSrcConfig = baseSrcConfig.replace('TOKEN', `${TOKEN}`);
fs_1.default.writeFileSync(`${__dirname}/config/config.js`, baseConfig);
fs_1.default.writeFileSync(`${__dirname}/../src/config/config.ts`, baseSrcConfig);
console.log('REMEMBER TO NEVER SHARE YOUR TOKEN WITH ANYONE!');
console.log('Configuration has been written, enjoy!');
