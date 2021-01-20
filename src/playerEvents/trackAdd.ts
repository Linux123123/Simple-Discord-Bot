module.exports = async (client, message, queue, track) => {
    let channel = await client.channels.fetch(message.settings.musicChannelId);
    let msg = await channel.messages.fetch(message.settings.musicMsgId);
    msg.edit(client.queueMessage(queue));
};
