"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = exports.conf = exports.name = exports.run = void 0;
const run = async (client, message, args) => {
    if (client.functions.musicUserCheck(client, message, true))
        return;
    message.channel.bulkDelete(1);
    if (!args[0] || isNaN(args[0]))
        return message.channel
            .send(`Please enter a valid number !`)
            .then((msg) => msg.delete({ timeout: 3000 }));
    if (Math.round(parseInt(args[0])) < 1 ||
        Math.round(parseInt(args[0])) > 100)
        return message.channel
            .send(`Please enter a valid number (between 1 and 100) !`)
            .then((msg) => msg.delete({ timeout: 3000 }));
    client.player.setVolume(message, parseInt(args[0]));
    message.channel
        .send(`Volume set to **${parseInt(args[0])}%** !`)
        .then((msg) => msg.delete({ timeout: 3000 }));
};
exports.run = run;
exports.name = 'volume';
exports.conf = {
    aliases: ['vol'],
    permLevel: 'Moderator',
};
exports.help = {
    category: 'Music',
    description: 'Sets colume for music',
    usage: 'volume <number>',
};
