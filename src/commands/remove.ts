import { TextChannel } from 'discord.js';
import { RunFunction } from '../interfaces/Command';

export const run: RunFunction = async (client, message, args) => {
    if (client.functions.musicUserCheck(client, message, true)) return;
    message.delete();
    if (!args[0]) {
        message.channel
            .send(`You need to provide song number in queue !`)
            .then((msg) => msg.delete({ timeout: 3000 }));
        return;
    }
    const queue = client.player.getQueue(message);
    const channel = client.channels.cache.find(
        (c) => c.id === message.settings.musicChannelId
    );
    if (!channel) return;
    const msg = (channel as TextChannel).messages.cache.find(
        (m) => m.id === message.settings.musicMsgId
    );
    if (!msg) return;
    msg.edit(client.functions.queueMessage(queue));
    client.player.remove(message, parseInt(args[0]));
    message.channel
        .send(`Song **removed** !`)
        .then((msg) => msg.delete({ timeout: 3000 }));
};
export const conf = {
    name: 'remove',
    aliases: ['r', 'rem'],
    permLevel: 'Moderator',
};

export const help = {
    category: 'Music',
    description: 'Remove a song from queue',
    usage: 'remove <number>',
};
