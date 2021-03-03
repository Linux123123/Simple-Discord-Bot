"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = exports.conf = exports.run = void 0;
const run = async (client, message, args) => {
    if (client.functions.musicUserCheck(client, message, true))
        return;
    message.channel.bulkDelete(1);
    if (!args[0]) {
        message.channel
            .send(`You need to provide song number in queue !`)
            .then((msg) => msg.delete({ timeout: 3000 }));
        return;
    }
    const queue = client.player.getQueue(message);
    client.channels.fetch(message.settings.musicChannelId).then((channel) => {
        channel.messages
            .fetch(message.settings.musicMsgId)
            .then((msg) => {
            msg.edit(client.functions.queueMessage(queue));
        });
    });
    client.player.remove(message, parseInt(args[0]));
    message.channel
        .send(`Song **removed** !`)
        .then((msg) => msg.delete({ timeout: 3000 }));
};
exports.run = run;
exports.conf = {
    name: 'remove',
    aliases: ['r', 'rem'],
    permLevel: 'Moderator',
};
exports.help = {
    category: 'Music',
    description: 'Remove a song from queue',
    usage: 'remove <number>',
};
