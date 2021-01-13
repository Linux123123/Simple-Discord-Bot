exports.run = async (client, message, args, level) => {
    if (client.musicUserCheck(client, message, true)) return;
    let queue = client.player.getQueue(message);
    let channel = await client.channels.fetch(message.settings.musicChannelId);
    let msg = await channel.messages.fetch(message.settings.musicMsgId);
    msg.edit(client.queueMessage(queue));

    client.player.skip(message);
    message.channel.bulkDelete(1).then(() => {
        message.channel
            .send(`Current song **Skipped** !`)
            .then((msg) => msg.delete({ timeout: 3000 }));
    });
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['sk'],
    permLevel: 'Moderator',
};

exports.help = {
    name: 'skip',
    category: 'Music',
    description: 'Skips a song',
    usage: 'skip',
};
