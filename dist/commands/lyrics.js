"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = exports.conf = exports.name = exports.run = void 0;
const run = async (client, message, args) => {
    if (!args[0]) {
        return message.reply('Must provide a songname! Derp.');
    }
    message.channel.send(await client.functions.lyrics(client, args.join(' '), message.settings.embedColor));
};
exports.run = run;
exports.name = 'lyrics';
exports.conf = {
    aliases: ['ly'],
    permLevel: 'User',
};
exports.help = {
    category: 'Music',
    description: 'Get song lyrics',
    usage: 'lyrics <songname>',
};
