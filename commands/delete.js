const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args, level) => {
    const user = message.mentions.users.first();
    // Parse Amount
    const amount = !!parseInt(message.content.split(' ')[1])
        ? parseInt(message.content.split(' ')[1])
        : parseInt(message.content.split(' ')[2]);
    if (!amount) return message.reply('Must specify an amount to delete!');
    if (!amount && !user)
        return message.reply(
            'Must specify a user and amount, or just an amount, of messages to purge!'
        );
    // Fetch 100 messages (will be filtered and lowered up to max amount requested)

    const embed = new MessageEmbed()
        .setTitle(`Successfully deleted ${amount} messages!`)
        .setColor(message.settings.embedColor)
        .setTimestamp();

    message.channel.messages
        .fetch({
            limit: 100,
        })
        .then((messages) => {
            if (user) {
                const filterBy = user ? user.id : Client.user.id;
                messages = messages
                    .filter((m) => m.author.id === filterBy)
                    .array()
                    .slice(0, amount);
            } else {
                messages = messages.array().slice(0, amount + 1);
            }
            message.channel
                .bulkDelete(messages)
                .then(() => {
                    message.channel
                        .send(embed)
                        .then((msg) => msg.delete({ timeout: 3000 }));
                })
                .catch((error) => console.log(error.stack));
        });
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['purge', 'clear', 'remove'],
    permLevel: 'Moderator',
};

exports.help = {
    name: 'delete',
    category: 'Chat',
    description: 'Delete user / channel messages',
    usage: 'delete 50 or delete @user 50',
};
