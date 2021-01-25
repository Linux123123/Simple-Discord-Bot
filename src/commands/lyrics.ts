import { RunFunction } from '../interfaces/Command';

export const run: RunFunction = async (client, message, args) => {
    if (!args[0]) {
        return message.reply('Must provide a songname! Derp.');
    }

    message.channel.send(
        await client.functions.lyrics(
            client,
            args.join(' '),
            message.settings.embedColor
        )
    );
};
export const name: string = 'lyrics';

export const conf = {
    aliases: ['ly'],
    permLevel: 'User',
};

export const help = {
    category: 'Music',
    description: 'Get song lyrics',
    usage: 'lyrics <songname>',
};
