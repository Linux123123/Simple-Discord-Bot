exports.run = async (client, message, args, level) => {
    if (client.musicUserCheck(client, message, true)) return;
    message.channel.bulkDelete(1);
    if (!client.player.getQueue(message).paused)
        return message.channel.send(`The music is already playing !`);
    client.player.resume(message);
    message.channel
        .send(
            `Song ${client.player.getQueue(message).playing.title} resumed ! !`
        )
        .then((msg) => msg.delete({ timeout: 3000 }));
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['r', 'res'],
    permLevel: 'Moderator',
};

exports.help = {
    name: 'resume',
    category: 'Music',
    description: 'Resumes music',
    usage: 'resume',
};
