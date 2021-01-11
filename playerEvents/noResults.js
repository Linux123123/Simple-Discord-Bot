module.exports = (client, message, query) => {
    message.channel
        .send(`No results found for ${query} !`)
        .then((msg) => msg.delete({ timeout: 3000 }));
};
