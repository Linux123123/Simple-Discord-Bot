/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { MessageEmbed } from 'discord.js';
import { RunFunction } from '../interfaces/Command';

export const run: RunFunction = async (client, message, args) => {
    if (args.length < 1) {
        return message.reply('Must provide a name! (of channel to create)');
    }
    if (!message.guild!.me!.hasPermission('MANAGE_CHANNELS'))
        return message.reply(`I don't have permissions to create a channel!`);
    const embed = new MessageEmbed()
        .setTitle('No song playing currently')
        .setImage('https://bestbots.today/wp-content/uploads/2020/04/Music.png')
        .setFooter(`Prefix for this server is: ${message.settings.prefix}`)
        .setColor(message.settings.embedColor);
    message
        .guild!.channels.create(args[0], {
            reason: 'Music bot channel!',
            topic: 'Music bot channel! Type a song and it will be played!',
        })
        .then((channel) => {
            client.settings.set(
                message.guild!.id,
                channel.id,
                'musicChannelId',
            );
            channel
                .send('Queue:\n', embed)
                .then((msg) =>
                    client.settings.set(
                        message.guild!.id,
                        msg.id,
                        'musicMsgId',
                    ),
                );
        });
};
export const conf = {
    name: 'setup-music',
    aliases: [],
    permLevel: 'Administrator',
};

export const help = {
    category: 'Music',
    description: 'Sets up music channel',
    usage: 'setup-music <name of channel to create>',
};
