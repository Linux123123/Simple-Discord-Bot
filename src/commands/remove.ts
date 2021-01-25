import { TextChannel } from 'discord.js';
import { RunFunction } from '../interfaces/Command';

export const run: RunFunction = async (client, message, args) => {
    if (client.functions.musicUserCheck(client, message, true)) return;
    (message.channel as TextChannel).bulkDelete(1);
    if (!args[0]) {
        message.channel
            .send(`You need to provide song number in queue !`)
            .then((msg) => msg.delete({ timeout: 3000 }));
        return;
    }
    let queue = client.player.getQueue(message);
    client.channels.fetch(message.settings.musicChannelId).then((channel) => {
        (channel as TextChannel).messages
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
export const name: string = 'remove';

export const conf = {
    aliases: ['r', 'rem'],
    permLevel: 'Moderator',
};

export const help = {
    category: 'Music',
    description: 'Remove a song from queue',
    usage: 'remove <number>',
};
