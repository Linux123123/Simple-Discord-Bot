module.exports = (client, message, queue, track) => {
    client.channels.fetch(message.settings.musicChannelId).then((channel) => {
        channel.messages.fetch(message.settings.musicMsgId).then((msg) => {
            msg.edit(client.queueMessage(queue));
        });
    });
};
