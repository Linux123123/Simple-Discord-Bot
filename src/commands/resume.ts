import { TextChannel } from 'discord.js';
import { RunFunction } from '../interfaces/Command';

export const run: RunFunction = async (client, message) => {
    if (client.functions.musicUserCheck(client, message, true)) return;
    (message.channel as TextChannel).bulkDelete(1);
    if (!client.player.getQueue(message).paused)
        return message.channel.send(`The music is already playing !`);
    client.player.resume(message);
    message.channel
        .send(
            `Song ${client.player.getQueue(message).playing.title} resumed ! !`,
        )
        .then((msg) => msg.delete({ timeout: 3000 }));
};
export const conf = {
    name: 'resume',
    aliases: ['r', 'res'],
    permLevel: 'Moderator',
};

export const help = {
    category: 'Music',
    description: 'Resumes music',
    usage: 'resume',
};
