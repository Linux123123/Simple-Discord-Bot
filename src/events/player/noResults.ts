import { Message } from '../../classes/Message';
import { RunFunction } from '../../interfaces/Event';
export const name: string = 'noResults';

export const run: RunFunction = (client, message: Message, query: string) => {
    message.channel
        .send(`No results found for ${query} !`)
        .then((msg) => msg.delete({ timeout: 3000 }));
};
