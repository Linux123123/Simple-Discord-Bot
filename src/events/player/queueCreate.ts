import { ReactionEmoji, TextChannel, User } from 'discord.js';
import { Message } from '../../classes/Message';
import { RunFunction } from '../../interfaces/Event';
export const run: RunFunction = async (client, message: Message) => {
    const channel = await client.channels.fetch(
        message.settings.musicChannelId
    );
    const msg = await (channel as TextChannel).messages.fetch(
        message.settings.musicMsgId
    );
    try {
        await msg.react('⏹');
        await msg.react('⏯');
        await msg.react('⏭');
    } catch (error) {
        client.logger.error(error);
        console.error(error);
    }
    const filter = (reaction: ReactionEmoji, user: User) =>
        user.id !== message.client.user?.id;
    const musicReactCollector = msg.createReactionCollector(filter);
    client.reactionCollectors.set(message.guild.id, musicReactCollector);
    musicReactCollector.on('collect', (reaction, user) => {
        switch (reaction.emoji.name) {
            case '⏭':
                client.player.skip(message);
                reaction.users.remove(user).catch(console.error);
                message.channel
                    .send(`${user.username} ⏩ skipped the song !`)
                    .then((msg) => msg.delete({ timeout: 3000 }))
                    .catch(console.error);
                break;

            case '⏯':
                reaction.users.remove(user).catch(console.error);
                if (!client.player.getQueue(message).paused) {
                    client.player.pause(message);
                    message.channel
                        .send(`${user.username} ⏸ paused the music !`)
                        .then((msg) => msg.delete({ timeout: 3000 }))
                        .catch(console.error);
                } else {
                    client.player.resume(message);
                    message.channel
                        .send(`${user} ▶ resumed the music !`)
                        .then((msg) => msg.delete({ timeout: 3000 }))
                        .catch(console.error);
                }
                break;

            case '⏹':
                reaction.users.remove(user).catch(console.error);
                client.player.stop(message);
                message.channel
                    .send(`${user.username} ⏹ stopped the music!`)
                    .then((msg) => msg.delete({ timeout: 3000 }))
                    .catch(console.error);
                musicReactCollector.stop();
                client.functions.clearBanner(client, message);
                break;

            default:
                reaction.users.remove(user).catch((err) => {
                    client.logger.error(`There has been an error: ${err}`);
                    console.error(err);
                });
                break;
        }
    });
};
