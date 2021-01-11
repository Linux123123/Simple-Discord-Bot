const { MessageEmbed } = require('discord.js');

module.exports = (client, message, queue) => {
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
};
