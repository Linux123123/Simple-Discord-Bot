import { Message } from '../../classes/Message';
import { Queue } from '../../classes/Queue';
import { RunFunction } from '../../interfaces/Event';
export const name: string = 'queueEnd';

export const run: RunFunction = (client, message: Message) => {
    (client.player.getQueue(message) as Queue).collector.stop();
    client.functions.clearBanner(client, message);
};
