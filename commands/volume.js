exports.run = async (client, message, args, level) => {
    if (client.musicUserCheck(client, message, true)) return;
    message.channel.bulkDelete(1);
    if (!args[0] || isNaN(args[0]))
        return message.channel
            .send(`Please enter a valid number !`)
            .then((msg) => msg.delete({ timeout: 3000 }));
    if (
        Math.round(parseInt(args[0])) < 1 ||
        Math.round(parseInt(args[0])) > 100
    )
        return message.channel
            .send(`Please enter a valid number (between 1 and 100) !`)
            .then((msg) => msg.delete({ timeout: 3000 }));

    client.player.setVolume(message, parseInt(args[0]));

    message.channel
        .send(`Volume set to **${parseInt(args[0])}%** !`)
        .then((msg) => msg.delete({ timeout: 3000 }));
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['vol'],
    permLevel: 'Moderator',
};

exports.help = {
    name: 'volume',
    category: 'Music',
    description: 'Sets colume for music',
    usage: 'volume <number>',
};
