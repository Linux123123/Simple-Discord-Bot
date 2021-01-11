const { MessageEmbed } = require('discord.js');

module.exports = (client, message, query, tracks) => {
    const embed = new MessageEmbed()
        .setColor(message.settings.embedColor)
        .setAuthor({ name: `Here are your search results for ${query}` })
        .setTimestamp(
            `${tracks.map((t, i) => `**${i + 1}** - ${t.title}`).join('\n')}`
        );
    message.channel.send(embed);
};
