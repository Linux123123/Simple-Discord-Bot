exports.run = async (client, message, args, level) => {
    if (client.musicUserCheck(client, message, true)) return;
    message.channel.bulkDelete(1);
    if (!args[0])
        return message.channel
            .send(`Please specify a valid filter to enable or disable !`)
            .then((msg) => msg.delete({ timeout: 3000 }));
    const filterToUpdate = client.config.filters.find(
        (x) => x.toLowerCase() === args[0].toLowerCase()
    );
    if (!filterToUpdate)
        return message.channel
            .send(`This filter doesn't exist ! (8D, vibrato, bassboost) !`)
            .then((msg) => msg.delete({ timeout: 3000 }));
    const filtersUpdated = {};
    filtersUpdated[filterToUpdate] = client.player.getQueue(message).filters[
        filterToUpdate
    ]
        ? false
        : true;
    client.player.setFilters(message, filtersUpdated);
    if (filtersUpdated[filterToUpdate])
        message.channel
            .send(`I'm **adding** the filter to the music, please wait...`)
            .then((msg) => msg.delete({ timeout: 3000 }));
    else
        message.channel
            .send(`I'm **disabling** the filter on the music, please wait...`)
            .then((msg) => msg.delete({ timeout: 3000 }));
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 'Moderator',
};

exports.help = {
    name: 'filter',
    category: 'Music',
    description: 'Add filters',
    usage: 'filter',
};
