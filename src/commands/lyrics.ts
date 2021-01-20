const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args, level) => {
    if (!args[0]) {
        return message.reply('Must provide a songname! Derp.');
    }
    const embed = new MessageEmbed()
        .setDescription(await client.lyrics(args.join(' ')))
        .setColor(message.settings.embedColor)
        .setTimestamp();

    message.channel.send(await embed);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['ly'],
    permLevel: 'User',
};

exports.help = {
    name: 'lyrics',
    category: 'Music',
    description: 'Get song lyrics',
    usage: 'lyrics <songname>',
};
