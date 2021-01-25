import { TextChannel } from 'discord.js';
import { Queue } from '../classes/Queue';
import { RunFunction } from '../interfaces/Command';

export const run: RunFunction = async (client, message) => {
    if (client.functions.musicUserCheck(client, message, true)) return;
    client.player.setRepeatMode(message, false);
    client.player.stop(message);
    (client.player.getQueue(message) as Queue).collector.stop();
    client.functions.clearBanner(client, message);
    (message.channel as TextChannel).bulkDelete(1).then(() => {
        message.channel
            .send(`Music **stopped** !`)
            .then((msg) => msg.delete({ timeout: 3000 }));
    });
};
export const name: string = 'stop';

export const conf = {
    aliases: ['s'],
    permLevel: 'Moderator',
};

export const help = {
    category: 'Music',
    description: 'Stops music',
    usage: 'stop',
};
