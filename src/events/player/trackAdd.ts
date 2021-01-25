import { TextChannel } from 'discord.js';
import { RunFunction } from '../../interfaces/Event';
export const name: string = 'trackAdd';

export const run: RunFunction = async (client, message, queue) => {
    let channel = await client.channels.fetch(message.settings.musicChannelId);
    let msg = await (channel as TextChannel).messages.fetch(
        message.settings.musicMsgId
    );
    msg.edit(client.functions.queueMessage(queue));
};
