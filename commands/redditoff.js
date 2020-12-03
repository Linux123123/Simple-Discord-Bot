const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args, level) => {
    const embed = new MessageEmbed()
        .setTitle('Reddit has been turned off!')
        .setColor(message.settings.embedColor)
        .setTimestamp();
    client.settings.set(message.guild.id, 'false', 'reddit');
    message.channel.send(embed).then((msg) => msg.delete({ timeout: 3000 }));
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['offreddit'],
    permLevel: 'Moderator',
};

exports.help = {
    name: 'redditoff',
    category: 'Reddit',
    description: 'Stop receiving reddit posts!',
    usage: 'redditoff',
};
