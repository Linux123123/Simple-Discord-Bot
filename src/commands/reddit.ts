import { TextChannel } from 'discord.js';
import { RunFunction } from '../interfaces/Command';
import { Reddit } from '../modules/Reddit';

export const run: RunFunction = async (client, message, args) => {
    const command = message.content
        .slice(message.settings.prefix.length)
        .trim()
        .split(/ +/g)[0]
        .toLowerCase();
    if (args.length < 1 && command !== 'memes') {
        return message.reply('Must provide a subreddit! Derp.');
    }

    switch (command) {
        case 'memes':
            await new Reddit(
                client,
                message.channel as TextChannel,
                'memes',
                message.settings
            ).start();
            break;
        default:
            await new Reddit(
                client,
                message.channel as TextChannel,
                command,
                message.settings
            ).start();
            break;
    }
};

export const conf = {
    name: 'reddit',
    aliases: ['memes'],
    permLevel: 'Moderator',
};

export const help = {
    category: 'Reddit',
    description: 'A subreddit in your channel!',
    usage: 'reddit subreddit\nmemes',
};
