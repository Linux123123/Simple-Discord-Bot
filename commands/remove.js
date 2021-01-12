exports.run = async (client, message, args, level) => {
    if (client.musicUserCheck(client, message, true)) return;
    message.channel.bulkDelete(1);
    if (!args[0]) {
        message.channel
            .send(`You need to provide song number in queue !`)
            .then((msg) => msg.delete({ timeout: 3000 }));
        return;
    }
    client.channels.fetch(message.settings.musicChannelId).then((channel) => {
        channel.messages.fetch(message.settings.musicMsgId).then((msg) => {
            msg.edit(client.queueMessage(queue));
        });
    });
    client.player.remove(message, parseInt(args[0]));

    message.channel
        .send(`Song **removed** !`)
        .then((msg) => msg.delete({ timeout: 3000 }));
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['r', 'rem'],
    permLevel: 'Moderator',
};

exports.help = {
    name: 'remove',
    category: 'Music',
    description: 'Remove a song from queue',
    usage: 'remove <number>',
};
