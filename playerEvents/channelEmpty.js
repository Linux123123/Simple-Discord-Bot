module.exports = (client, message, queue) => {
    message.channel
        .send(`Disconnected, because no one is in the channel!`)
        .then((msg) => msg.delete({ timeout: 3000 }));
};
