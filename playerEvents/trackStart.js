const { MessageEmbed } = require('discord.js');

module.exports = async (client, message, track, queue) => {
    try {
        let song;
        let lyricsChannel = await client.channels.fetch(
            message.settings.lyricsChannelId
        );
        let channel = await client.channels.fetch(
            message.settings.musicChannelId
        );
        let msg = await channel.messages.fetch(message.settings.musicMsgId);
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
        if (track.title.toLowerCase().includes('official')) {
            let index = track.title.toLowerCase().search(/\bofficial\b/);
            song = track.title.slice(0, index);
        } else song = track.title;
        console.log(song);
        const lyricsEmbed = new MessageEmbed()
            .setTitle(track.title)
            .setDescription(await client.lyrics(song))
            .setColor(message.settings.embedColor)
            .setTimestamp()
            .setAuthor(track.author);

        lyricsChannel.send(await lyricsEmbed);
    } catch (error) {
        client.logger.error(error);
    }
};
