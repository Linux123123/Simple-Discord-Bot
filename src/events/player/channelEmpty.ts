import { Message } from '../../classes/Message';
import { RunFunction } from '../../interfaces/Event';
export const run: RunFunction = async (client, message: Message) => {
    client.functions.clearBanner(client, message);
    message.channel
        .send(`Disconnected, because no one is in the channel!`)
        .then((msg) => msg.delete({ timeout: 3000 }));
};
