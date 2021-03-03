"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = exports.conf = exports.run = void 0;
const run = async (client, message) => {
    if (client.functions.musicUserCheck(client, message, true))
        return;
    const queue = client.player.getQueue(message);
    const channel = await client.channels.fetch(message.settings.musicChannelId);
    const msg = await channel.messages.fetch(message.settings.musicMsgId);
    msg.edit(client.functions.queueMessage(queue));
    client.player.skip(message);
    message.channel.bulkDelete(1).then(() => {
        message.channel
            .send(`Current song **Skipped** !`)
            .then((msg) => msg.delete({ timeout: 3000 }));
    });
};
exports.run = run;
exports.conf = {
    name: 'skip',
    aliases: ['sk'],
    permLevel: 'Moderator',
};
exports.help = {
    category: 'Music',
    description: 'Skips a song',
    usage: 'skip',
};
