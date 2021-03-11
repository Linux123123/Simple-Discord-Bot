import { TextChannel } from 'discord.js';
import { RunFunction } from '../interfaces/Command';

export const run: RunFunction = async (client, message) => {
    if (client.functions.musicUserCheck(client, message, true)) return;
    const queue = client.player.getQueue(message);
    const channel = (await client.channels.fetch(
        message.settings.musicChannelId
    )) as TextChannel;
    if (!channel) return;
    const msg = await channel.messages.fetch(message.settings.musicMsgId);
    if (!msg) return;
    msg.edit(client.functions.queueMessage(queue));
    client.player.skip(message);
    (message.channel as TextChannel).bulkDelete(1).then(() => {
        message.channel
            .send(`Current song **Skipped** !`)
            .then((msg) => msg.delete({ timeout: 3000 }));
    });
};
export const conf = {
    name: 'skip',
    aliases: ['sk'],
    permLevel: 'Moderator',
};

export const help = {
    category: 'Music',
    description: 'Skips a song',
    usage: 'skip',
};
