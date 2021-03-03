"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = exports.conf = exports.run = void 0;
const run = async (client, message) => {
    if (client.functions.musicUserCheck(client, message, true))
        return;
    message.channel.bulkDelete(1);
    if (client.player.getQueue(message).paused)
        return message.channel.send(`The music is already paused !`);
    client.player.pause(message);
    message.channel
        .send(`Music **Paused** !`)
        .then((msg) => msg.delete({ timeout: 3000 }));
};
exports.run = run;
exports.conf = {
    name: 'pause',
    aliases: ['pa'],
    permLevel: 'Moderator',
};
exports.help = {
    category: 'Music',
    description: 'Pauses music',
    usage: 'pause',
};
