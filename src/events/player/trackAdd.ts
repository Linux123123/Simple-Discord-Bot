import { TextChannel } from 'discord.js';
import { RunFunction } from '../../interfaces/Event';
export const run: RunFunction = async (client, message, queue) => {
    const channel = (await client.channels.fetch(
        message.settings.musicChannelId,
        true
    )) as TextChannel;
    const msg = await channel.messages.fetch(message.settings.musicMsgId);
    msg.edit(client.functions.queueMessage(queue));
};
