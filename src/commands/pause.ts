exports.run = async (client, message, args, level) => {
    if (client.musicUserCheck(client, message, true)) return;
    message.channel.bulkDelete(1);
    if (client.player.getQueue(message).paused)
        return message.channel.send(`The music is already paused !`);
    client.player.pause(message);
    message.channel
        .send(`Music **Paused** !`)
        .then((msg) => msg.delete({ timeout: 3000 }));
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['pa'],
    permLevel: 'Moderator',
};

exports.help = {
    name: 'pause',
    category: 'Music',
    description: 'Pauses music',
    usage: 'pause',
};
