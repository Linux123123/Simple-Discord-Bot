exports.run = async (client, message, args, level) => {
    if (client.musicUserCheck(client, message, false)) {
        return;
    }
    if (!args[0]) {
        message.channel.bulkDelete(1).then(() => {
            message.channel
                .send(`Please indicate the title of a song !`)
                .then((msg) => msg.delete({ timeout: 3000 }));
        });
        return;
    }
    message.channel.bulkDelete(1);
    client.player.play(message, args.join(' '), true);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['p'],
    permLevel: 'User',
};

exports.help = {
    name: 'play',
    category: 'Music',
    description: 'Plays music',
    usage: 'play <song>',
};
