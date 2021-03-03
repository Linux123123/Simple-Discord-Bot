import { TextChannel } from 'discord.js';
import { RunFunction } from '../interfaces/Command';

export const run: RunFunction = async (client, message, args) => {
    if (client.functions.musicUserCheck(client, message, false)) {
        return;
    }
    if (!args[0]) {
        (message.channel as TextChannel).bulkDelete(1).then(() => {
            message.channel
                .send(`Please indicate the title of a song !`)
                .then((msg) => msg.delete({ timeout: 3000 }));
        });
        return;
    }
    (message.channel as TextChannel).bulkDelete(1);
    client.player.play(message, args.join(' '), true);
};
export const conf = {
    name: 'play',
    aliases: ['p'],
    permLevel: 'User',
};

export const help = {
    category: 'Music',
    description: 'Plays music',
    usage: 'play <song>',
};
