const { MessageEmbed } = require('discord.js');
const { LyriksClient } = require('lyriks.js');

module.exports = async (client, message, track, queue) => {
    try {
        let lyricsChannel = await client.channels.fetch(
            message.settings.lyricsChannelId
        );
        let channel = await client.channels.fetch(
            message.settings.musicChannelId
        );
        let msg = await channel.messages.fetch(message.settings.musicMsgId);
        const lyriksClient = new LyriksClient();
        let lyrik = await lyriksClient.getLyrics(track.title);
        if (lyrik) {
            let songLyrics = await lyrik.getContent();
            const lyrics = new MessageEmbed()
                .setTitle(track.title)
                .setDescription(songLyrics)
                .setURL(track.url)
                .setAuthor(track.author)
                .setColor(message.settings.embedColor);
            lyricsChannel.send(lyrics);
        }
        const embed = new MessageEmbed()
            .setTitle(track.title)
            .setURL(track.url)
            .addFields(
                {
                    name: 'Views:',
                    value: track.views,
                    inline: true,
                },
                {
                    name: 'Duration:',
                    value: track.duration,
                    inline: true,
                }
            )
            .setImage(track.thumbnail)
            .setAuthor(track.author)
            .setFooter(`Requested by ${track.requestedBy.username}`)
            .setColor(message.settings.embedColor);
        msg.edit(client.queueMessage(queue), embed);
    } catch (error) {
        client.logger.error(error);
    }
};
