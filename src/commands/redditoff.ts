import { TextChannel } from 'discord.js';
import { RunFunction } from '../interfaces/Command';

export const run: RunFunction = async (client, message) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    client.settings.set(message.guild!.id, 'false', 'reddit');
    (message.channel as TextChannel).bulkDelete(1).then(() => {
        message.channel
            .send(
                client.embed({
                    title: 'Reddit has been turned off!',
                    color: message.settings.embedColor,
                    timestamp: new Date(),
                }),
            )
            .then((msg) => msg.delete({ timeout: 3000 }));
    });
};
export const conf = {
    name: 'redditoff',
    aliases: ['offreddit'],
    permLevel: 'Moderator',
};

export const help = {
    category: 'Reddit',
    description: 'Stop receiving reddit posts!',
    usage: 'redditoff',
};
