"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = exports.conf = exports.name = exports.run = void 0;
const run = async (client, message) => {
    if (client.functions.musicUserCheck(client, message, true))
        return;
    client.player.setRepeatMode(message, false);
    client.player.stop(message);
    client.player.getQueue(message).collector.stop();
    client.functions.clearBanner(client, message);
    message.channel.bulkDelete(1).then(() => {
        message.channel
            .send(`Music **stopped** !`)
            .then((msg) => msg.delete({ timeout: 3000 }));
    });
};
exports.run = run;
exports.name = 'stop';
exports.conf = {
    aliases: ['s'],
    permLevel: 'Moderator',
};
exports.help = {
    category: 'Music',
    description: 'Stops music',
    usage: 'stop',
};
