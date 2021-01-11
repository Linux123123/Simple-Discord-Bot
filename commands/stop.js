const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args, level) => {
    if (client.musicUserCheck(client, message, true)) return;
    client.player.setRepeatMode(message, false);
    client.player.stop(message);
    client.channels.fetch(message.settings.musicChannelId).then((channel) => {
        channel.messages.fetch(message.settings.musicMsgId).then((msg) => {
            const embed = new MessageEmbed()
                .setTitle('No song playing currently')
                .setImage(
                    'https://bestbots.today/wp-content/uploads/2020/04/Music.png'
                )
                .setFooter(
                    `Prefix for this server is: ${message.settings.prefix}`
                )
                .setColor(message.settings.embedColor);
            msg.edit(embed);
        });
    });
    message.channel.bulkDelete(1).then(() => {
        message.channel
            .send(`Music **stopped** !`)
            .then((msg) => msg.delete({ timeout: 3000 }));
    });
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['s'],
    permLevel: 'Moderator',
};

exports.help = {
    name: 'stop',
    category: 'Music',
    description: 'Stops music',
    usage: 'stop',
};
