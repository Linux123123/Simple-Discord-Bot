"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.name = void 0;
exports.name = 'queueCreate';
const run = async (client, message) => {
    let channel = await client.channels.fetch(message.settings.musicChannelId);
    let msg = await channel.messages.fetch(message.settings.musicMsgId);
    try {
        await msg.react('⏹');
        await msg.react('⏯');
        await msg.react('⏭');
    }
    catch (error) {
        client.logger(error, 'error');
    }
    const filter = (reaction, user) => user.id !== message.client.user.id;
    var musicReactCollector = msg.createReactionCollector(filter);
    client.player.getQueue(message).collector = musicReactCollector;
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
                }
                else {
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
                reaction.users
                    .remove(user)
                    .catch((err) => client.logger(err, 'error'));
                break;
        }
    });
    musicReactCollector.on('end', () => { });
};
exports.run = run;
