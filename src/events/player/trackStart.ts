import { Track } from 'discord-player';
import { Queue } from '../../classes/Queue';
import { MessageEmbed, TextChannel } from 'discord.js';
import { Message } from '../../classes/Message';
import { RunFunction } from '../../interfaces/Event';
export const name: string = 'trackStart';

export const run: RunFunction = async (
    client,
    message: Message,
    track: Track,
    queue: Queue
) => {
    try {
        let song;
        let lyricsChannel = await client.channels.fetch(
            message.settings.lyricsChannelId
        );
        let channel = await client.channels.fetch(
            message.settings.musicChannelId
        );
        let msg = await (channel as TextChannel).messages.fetch(
            message.settings.musicMsgId
        );
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
        msg.edit(client.functions.queueMessage(queue), embed);
        if (track.title.toLowerCase().includes('official')) {
            let index = track.title.toLowerCase().search(/\bofficial\b/);
            song = track.title.slice(0, index - 1).trim();
        } else song = track.title;
        (lyricsChannel as TextChannel).send(
            await client.functions.lyrics(
                client,
                song,
                message.settings.embedColor
            )
        );
    } catch (error) {
        client.logger(error, 'error');
    }
};
