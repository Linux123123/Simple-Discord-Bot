module.exports = async (client, message) => {
    let channel = await client.channels.fetch(message.settings.musicChannelId);
    let msg = await channel.messages.fetch(message.settings.musicMsgId);
    try {
        await msg.react('⏯');
        await msg.react('⏭');
        await msg.react('⏹');
    } catch (error) {
        client.logger.error(error);
    }
    const filter = (reaction, user) => user.id !== message.client.user.id;
    var musicReactCollector = msg.createReactionCollector(filter);
    musicReactCollector.on('collect', (reaction, user) => {
        switch (reaction.emoji.name) {
            case '⏭':
                client.player.skip(message);
                reaction.users.remove(user).catch(console.error);
                message.channel
                    .send(`${user} ⏩ skipped the song !`)
                    .then((msg) => msg.delete({ timeout: 3000 }))
                    .catch(console.error);
                break;

            case '⏯':
                reaction.users.remove(user).catch(console.error);
                if (!client.player.getQueue(message).paused) {
                    client.player.pause(message);
                    message.channel
                        .send(`${user} ⏸ paused the music !`)
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
                    .send(`${user} ⏹ stopped the music!`)
                    .then((msg) => msg.delete({ timeout: 3000 }))
                    .catch(console.error);
                musicReactCollector.stop();
                client.clearBanner(client, message);
                break;

            default:
                reaction.users.remove(user).catch(console.error);
                break;
        }
    });
};
