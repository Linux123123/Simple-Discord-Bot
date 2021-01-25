"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = exports.conf = exports.name = exports.run = void 0;
const run = async (client, message, args, level) => {
    const user = message.mentions.users.first();
    const amount = !!parseInt(message.content.split(' ')[1])
        ? parseInt(message.content.split(' ')[1])
        : parseInt(message.content.split(' ')[2]);
    if (!amount)
        return message.reply('Must specify an amount to delete!');
    if (!amount && !user)
        return message.reply('Must specify a user and amount, or just an amount, of messages to purge!');
    message.channel.bulkDelete(1);
    const embed = client.embed({
        title: `Successfully deleted ${amount} messages!`,
        color: message.settings.embedColor,
        timestamp: new Date(),
    });
    let delMessages;
    message.channel.messages
        .fetch({
        limit: 100,
    })
        .then((messages) => {
        if (user) {
            const filterBy = user ? user.id : client.user.id;
            delMessages = messages
                .filter((m) => m.author.id === filterBy)
                .array()
                .slice(0, amount);
        }
        else {
            delMessages = messages.array().slice(0, amount + 1);
        }
        message.channel
            .bulkDelete(delMessages)
            .then(() => {
            message.channel
                .send(embed)
                .then((msg) => msg.delete({ timeout: 3000 }));
        })
            .catch((error) => {
            client.logger(error, 'error');
        });
    });
};
exports.run = run;
exports.name = 'delete';
exports.conf = {
    aliases: ['purge', 'clear', 'remove'],
    permLevel: 'Moderator',
};
exports.help = {
    category: 'Chat',
    description: 'Delete user / channel messages',
    usage: 'delete 50 or delete @user 50',
};
