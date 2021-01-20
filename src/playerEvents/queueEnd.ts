module.exports = (client, message) => {
    client.player.getQueue(message).collector.stop();
    client.clearBanner(client, message);
};
