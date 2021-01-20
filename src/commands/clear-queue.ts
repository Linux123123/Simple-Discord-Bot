exports.run = (client, message, args, level) => {
    if (client.musicUserCheck(client, message, true)) {
        return;
    }
    if (client.player.getQueue(message).tracks.length <= 1)
        return message.channel.send(`There is only one song in the queue.`);
    client.player.clearQueue(message);
    message.channel.bulkDelete(1).then(() => {
        message.channel
            .send(`The queue has just been **removed** !`)
            .then((msg) => msg.delete({ timeout: 3000 }));
    });
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['cq', 'clr-que'],
    permLevel: 'Moderator',
};

exports.help = {
    name: 'clear-queue',
    category: 'Music',
    description: 'Clears queue',
    usage: 'clear-queue',
};
