import { TextChannel } from 'discord.js';
import { RunFunction } from '../interfaces/Command';

export const run: RunFunction = async (client, message) => {
    client.settings.set(message.guild!.id, 'false', 'reddit');
    (message.channel as TextChannel).bulkDelete(1).then(() => {
        message.channel
            .send(
                client.embed({
                    title: 'Reddit has been turned off!',
                    color: message.settings.embedColor,
                    timestamp: new Date(),
                })
            )
            .then((msg) => msg.delete({ timeout: 3000 }));
    });
};
export const name: string = 'redditoff';

export const conf = {
    aliases: ['offreddit'],
    permLevel: 'Moderator',
};

export const help = {
    category: 'Reddit',
    description: 'Stop receiving reddit posts!',
    usage: 'redditoff',
};
