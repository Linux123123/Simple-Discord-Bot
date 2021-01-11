const { MessageEmbed } = require('discord.js');

module.exports = (client, message, track) => {
    client.channels.fetch(message.settings.musicChannelId).then((channel) => {
        channel.messages.fetch(message.settings.musicMsgId).then((msg) => {
            const embed = new MessageEmbed()
                .setTitle(track.title)
                .setURL(track.url)
                .addFields(
                    { name: 'Views:', value: track.views, inline: true },
                    { name: 'Duration:', value: track.duration, inline: true }
                )
                .setImage(track.thumbnail)
                .setAuthor(track.author)
                .setFooter(`Requested by ${track.requestedBy.username}`)
                .setColor(message.settings.embedColor);
            msg.edit(embed);
        });
    });
};
