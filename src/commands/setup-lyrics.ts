import { RunFunction } from '../interfaces/Command';

export const run: RunFunction = async (client, message, args) => {
    if (!args[0]) {
        return message.reply('Must provide a name! (of channel to create)');
    }
    if (!message.guild!.me!.hasPermission('MANAGE_CHANNELS'))
        return message.reply(`I don't have permissions to create a channel!`);
    message
        .guild!.channels.create(args[0], {
            reason: 'Lyrics channel!',
            topic: 'Lyrics channel!',
        })
        .then((channel) => {
            client.settings.set(
                message.guild!.id,
                channel.id,
                'lyricsChannelId'
            );
        });
};
export const name: string = 'setup-lyrics';

export const conf = {
    aliases: [],
    permLevel: 'Administrator',
};

export const help = {
    category: 'Music',
    description: 'Sets up lyrics channel',
    usage: 'setup-lyrics <name of channel to create>',
};
