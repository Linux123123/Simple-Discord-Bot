"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.name = void 0;
exports.name = 'error';
const run = (client, error, message) => {
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
            client.logger(`Discord-player error: ${error}`, 'error');
    }
};
exports.run = run;
