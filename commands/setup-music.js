const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args, level) => {
    if (args < 1) {
        return message.reply('Must provide a name! (of channel to create)');
    }
    if (!message.guild.me.hasPermission('MANAGE_CHANNELS'))
        return message.reply(`I don't have permissions to create a channel!`);
    const embed = new MessageEmbed()
        .setTitle('No song playing currently')
        .setImage('https://bestbots.today/wp-content/uploads/2020/04/Music.png')
        .setFooter(`Prefix for this server is: ${message.settings.prefix}`)
        .setColor(message.settings.embedColor);
    message.guild.channels
        .create(args[0], {
            reason: 'Music bot channel!',
            topic: 'Music bot channel! Type a song and it will be played!',
        })
        .then((channel) => {
            client.settings.set(message.guild.id, channel.id, 'musicChannelId');
            channel
                .send('Queue:\n', embed)
                .then((msg) =>
                    client.settings.set(message.guild.id, msg.id, 'musicMsgId')
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
    name: 'setup-music',
    category: 'Music',
    description: 'Sets up music channel',
    usage: 'setup-music <name of channel to create>',
};
