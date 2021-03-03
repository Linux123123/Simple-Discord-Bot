import { TextChannel } from 'discord.js';
import { RunFunction } from '../../interfaces/Event';
export const name = 'trackAdd';

export const run: RunFunction = async (client, message, queue) => {
    const channel = await client.channels.fetch(
        message.settings.musicChannelId,
    );
    const msg = await (channel as TextChannel).messages.fetch(
        message.settings.musicMsgId,
    );
    msg.edit(client.functions.queueMessage(queue));
};
