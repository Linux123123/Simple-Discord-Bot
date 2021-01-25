"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = exports.conf = exports.name = exports.run = void 0;
const run = async (client, message) => {
    client.settings.set(message.guild.id, 'false', 'reddit');
    message.channel.bulkDelete(1).then(() => {
        message.channel
            .send(client.embed({
            title: 'Reddit has been turned off!',
            color: message.settings.embedColor,
            timestamp: new Date(),
        }))
            .then((msg) => msg.delete({ timeout: 3000 }));
    });
};
exports.run = run;
exports.name = 'redditoff';
exports.conf = {
    aliases: ['offreddit'],
    permLevel: 'Moderator',
};
exports.help = {
    category: 'Reddit',
    description: 'Stop receiving reddit posts!',
    usage: 'redditoff',
};
