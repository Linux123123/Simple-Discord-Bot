import { Message } from '../../classes/Message';
import { RunFunction } from '../../interfaces/Event';
export const run: RunFunction = (client, message: Message) => {
    const collector = client.reactionCollectors.get(message.guild.id);
    if (!collector) return;
    collector.stop();
    client.functions.clearBanner(client, message);
};
