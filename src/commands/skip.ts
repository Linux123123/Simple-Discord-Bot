import { TextChannel } from 'discord.js';
import { RunFunction } from '../interfaces/Command';

export const run: RunFunction = async (client, message) => {
    if (client.functions.musicUserCheck(client, message, true)) return;
    let queue = client.player.getQueue(message);
    let channel = await client.channels.fetch(message.settings.musicChannelId);
    let msg = await (channel as TextChannel).messages.fetch(
        message.settings.musicMsgId
    );
    msg.edit(client.functions.queueMessage(queue));

    client.player.skip(message);
    (message.channel as TextChannel).bulkDelete(1).then(() => {
        message.channel
            .send(`Current song **Skipped** !`)
            .then((msg) => msg.delete({ timeout: 3000 }));
    });
};
export const name: string = 'skip';

export const conf = {
    aliases: ['sk'],
    permLevel: 'Moderator',
};

export const help = {
    category: 'Music',
    description: 'Skips a song',
    usage: 'skip',
};
