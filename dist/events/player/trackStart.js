"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.name = void 0;
const discord_js_1 = require("discord.js");
exports.name = 'trackStart';
const run = async (client, message, track, queue) => {
    try {
        let song;
        const lyricsChannel = client.channels.cache.find((c) => message.settings.lyricsChannelId === c.id);
        const channel = client.channels.cache.find((c) => message.settings.musicChannelId === c.id);
        const msg = channel.messages.cache.find((c) => message.settings.musicMsgId === c.id);
        if (!msg)
            return;
        const embed = new discord_js_1.MessageEmbed()
            .setTitle(track.title)
            .setURL(track.url)
            .addFields({
            name: 'Views:',
            value: track.views,
            inline: true,
        }, {
            name: 'Duration:',
            value: track.duration,
            inline: true,
        })
            .setImage(track.thumbnail)
            .setAuthor(track.author)
            .setFooter(`Requested by ${track.requestedBy.username}`)
            .setColor(message.settings.embedColor);
        msg.edit(client.functions.queueMessage(queue), embed);
        if (track.title.toLowerCase().includes('official')) {
            const index = track.title.toLowerCase().search(/\bofficial\b/);
            song = track.title.slice(0, index - 1).trim();
        }
        else
            song = track.title;
        if (lyricsChannel)
            lyricsChannel.send(await client.functions.lyrics(client, song, message.settings.embedColor));
    }
    catch (error) {
        client.logger(error, 'error');
    }
};
exports.run = run;
