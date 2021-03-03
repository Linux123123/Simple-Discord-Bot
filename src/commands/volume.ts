import { TextChannel } from 'discord.js';
import { RunFunction } from '../interfaces/Command';

export const run: RunFunction = async (client, message, args) => {
    if (client.functions.musicUserCheck(client, message, true)) return;
    (message.channel as TextChannel).bulkDelete(1);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!args[0] || isNaN(args[0] as any))
        return message.channel
            .send(`Please enter a valid number !`)
            .then((msg) => msg.delete({ timeout: 3000 }));
    if (
        Math.round(parseInt(args[0])) < 1 ||
        Math.round(parseInt(args[0])) > 100
    )
        return message.channel
            .send(`Please enter a valid number (between 1 and 100) !`)
            .then((msg) => msg.delete({ timeout: 3000 }));

    client.player.setVolume(message, parseInt(args[0]));

    message.channel
        .send(`Volume set to **${parseInt(args[0])}%** !`)
        .then((msg) => msg.delete({ timeout: 3000 }));
};
export const conf = {
    name: 'volume',
    aliases: ['vol'],
    permLevel: 'Moderator',
};

export const help = {
    category: 'Music',
    description: 'Sets colume for music',
    usage: 'volume <number>',
};
