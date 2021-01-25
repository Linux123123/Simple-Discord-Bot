"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = exports.conf = exports.name = exports.run = void 0;
const run = async (client, message) => {
    if (client.functions.musicUserCheck(client, message, true)) {
        return;
    }
    if (client.player.getQueue(message).tracks.length <= 1)
        return message.channel.send(`There is only one song in the queue.`);
    client.player.clearQueue(message);
    message.channel.bulkDelete(1).then(() => {
        message.channel
            .send(`The queue has just been **removed** !`)
            .then((msg) => msg.delete({ timeout: 3000 }));
    });
};
exports.run = run;
exports.name = 'clear-queue';
exports.conf = {
    aliases: ['cq', 'clr-que'],
    permLevel: 'Moderator',
};
exports.help = {
    category: 'Music',
    description: 'Clears queue',
    usage: 'clear-queue',
};
