import { PlayerError } from 'discord-player';
import { Message } from '../../classes/Message';
import { RunFunction } from '../../interfaces/Event';
export const run: RunFunction = (
    client,
    error: PlayerError,
    message: Message
) => {
    client.functions.clearBanner(client, message);
    switch (error) {
        case 'NotPlaying':
            message.channel
                .send('Music is not being played on this server !')
                .then((msg) => msg.delete({ timeout: 3000 }));
            break;
        case 'NotConnected':
            message.channel
                .send(`You aren't connected in any voice channel !`)
                .then((msg) => msg.delete({ timeout: 3000 }));
            break;
        case 'UnableToJoin':
            message.channel
                .send(`I can't join your voice channel! (perms?)`)
                .then((msg) => msg.delete({ timeout: 3000 }));
            break;
        default:
            client.logger.error(`Discord-player error: ${error}`);
            console.error(error);
    }
};
