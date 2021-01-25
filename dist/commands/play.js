"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = exports.conf = exports.name = exports.run = void 0;
const run = async (client, message, args) => {
    if (client.functions.musicUserCheck(client, message, false)) {
        return;
    }
    if (!args[0]) {
        message.channel.bulkDelete(1).then(() => {
            message.channel
                .send(`Please indicate the title of a song !`)
                .then((msg) => msg.delete({ timeout: 3000 }));
        });
        return;
    }
    message.channel.bulkDelete(1);
    client.player.play(message, args.join(' '), true);
};
exports.run = run;
exports.name = 'play';
exports.conf = {
    aliases: ['p'],
    permLevel: 'User',
};
exports.help = {
    category: 'Music',
    description: 'Plays music',
    usage: 'play <song>',
};
