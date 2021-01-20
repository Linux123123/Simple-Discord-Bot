exports.run = async (client, message, args, level) => {
    if (client.musicUserCheck(client, message, true)) return;
    client.player.setRepeatMode(message, false);
    client.player.stop(message);
    client.player.getQueue(message).collector.stop();
    client.clearBanner(client, message);
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
