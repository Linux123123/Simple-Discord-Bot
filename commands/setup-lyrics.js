exports.run = async (client, message, args, level) => {
    if (args < 1) {
        return message.reply('Must provide a name! (of channel to create)');
    }
    if (!message.guild.me.hasPermission('MANAGE_CHANNELS'))
        return message.reply(`I don't have permissions to create a channel!`);
    message.guild.channels
        .create(args[0], {
            reason: 'Lyrics channel!',
            topic: 'Lyrics channel!',
        })
        .then((channel) => {
            client.settings.set(
                message.guild.id,
                channel.id,
                'lyricsChannelId'
            );
        });
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 'Administrator',
};

exports.help = {
    name: 'setup-lyrics',
    category: 'Music',
    description: 'Sets up lyrics channel',
    usage: 'setup-lyrics <name of channel to create>',
};
