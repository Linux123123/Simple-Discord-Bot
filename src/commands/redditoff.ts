import { TextChannel } from 'discord.js';
import { RunFunction } from '../interfaces/Command';

export const run: RunFunction = async (client, message, args) => {
    if (!args[0]) {
        return message.reply('You must provide a subreddit name');
    }
    const subReddit = args[0];

    const reddits = client.reddit.map((reddit) => {
        if (reddit.check(subReddit, message.channel as TextChannel)) {
            return reddit;
        }
    });

    await message.delete();

    if (!reddits)
        return message.reply(
            `Not found any subreddit r/${subReddit} on this server!`
        );

    reddits.forEach((reddit) => {
        reddit?.stop();
    });

    message.channel
        .send(
            client.embed({
                title: `r/${subReddit} has been turned off!`,
                color: message.settings.embedColor,
                timestamp: new Date(),
            })
        )
        .then((msg) => msg.delete({ timeout: 3000 }));
};
export const conf = {
    name: 'redditoff',
    aliases: ['offreddit'],
    permLevel: 'Moderator',
};

export const help = {
    category: 'Reddit',
    description: 'Stop receiving reddit posts!',
    usage: 'redditoff <subreddit>',
};
