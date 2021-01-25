import { TextChannel } from 'discord.js';
import { RunFunction } from '../interfaces/Command';

export const run: RunFunction = async (client, message) => {
    if (client.functions.musicUserCheck(client, message, true)) {
        return;
    }
    if (client.player.getQueue(message).tracks.length <= 1)
        return message.channel.send(`There is only one song in the queue.`);
    client.player.clearQueue(message);
    (message.channel as TextChannel).bulkDelete(1).then(() => {
        message.channel
            .send(`The queue has just been **removed** !`)
            .then((msg) => msg.delete({ timeout: 3000 }));
    });
};
export const name: string = 'clear-queue';

export const conf = {
    aliases: ['cq', 'clr-que'],
    permLevel: 'Moderator',
};

export const help = {
    category: 'Music',
    description: 'Clears queue',
    usage: 'clear-queue',
};
