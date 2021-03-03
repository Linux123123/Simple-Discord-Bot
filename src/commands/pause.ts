import { TextChannel } from 'discord.js';
import { RunFunction } from '../interfaces/Command';

export const run: RunFunction = async (client, message) => {
    if (client.functions.musicUserCheck(client, message, true)) return;
    (message.channel as TextChannel).bulkDelete(1);
    if (client.player.getQueue(message).paused)
        return message.channel.send(`The music is already paused !`);
    client.player.pause(message);
    message.channel
        .send(`Music **Paused** !`)
        .then((msg) => msg.delete({ timeout: 3000 }));
};
export const conf = {
    name: 'pause',
    aliases: ['pa'],
    permLevel: 'Moderator',
};

export const help = {
    category: 'Music',
    description: 'Pauses music',
    usage: 'pause',
};
