"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = exports.conf = exports.run = void 0;
const run = async (client, message) => {
    if (client.functions.musicUserCheck(client, message, true))
        return;
    message.channel.bulkDelete(1);
    if (!client.player.getQueue(message).paused)
        return message.channel.send(`The music is already playing !`);
    client.player.resume(message);
    message.channel
        .send(`Song ${client.player.getQueue(message).playing.title} resumed ! !`)
        .then((msg) => msg.delete({ timeout: 3000 }));
};
exports.run = run;
exports.conf = {
    name: 'resume',
    aliases: ['r', 'res'],
    permLevel: 'Moderator',
};
exports.help = {
    category: 'Music',
    description: 'Resumes music',
    usage: 'resume',
};
