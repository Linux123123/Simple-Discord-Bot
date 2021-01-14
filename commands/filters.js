const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args, level) => {
    if (client.musicUserCheck(client, message, true)) return;
    message.channel.bulkDelete(1);
    const filtersStatuses = [[], []];

    client.config.filters.forEach((filterName) => {
        const array =
            filtersStatuses[0].length > filtersStatuses[1].length
                ? filtersStatuses[1]
                : filtersStatuses[0];
        array.push(
            filterName.charAt(0).toUpperCase() +
                filterName.slice(1) +
                ' : ' +
                (client.player.getQueue(message).filters[filterName]
                    ? `:white_check_mark:`
                    : `:negative_squared_cross_mark:`)
        );
    });

    const embed = new MessageEmbed()
        .setTitle(`**Filters**`)
        .addFields(
            {
                name: 'Filters:',
                value: filtersStatuses[0].join('\n'),
                inline: true,
            },
            {
                name: '** **',
                value: filtersStatuses[1].join('\n'),
                inline: true,
            }
        )
        .setColor(message.settings.embedColor)
        .setTimestamp();

    message.channel.send(embed).then((msg) => msg.delete({ timeout: 10000 }));
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 'Moderator',
};

exports.help = {
    name: 'filters',
    category: 'Music',
    description: 'Show filters',
    usage: 'filters',
};
