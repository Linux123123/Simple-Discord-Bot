"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.name = void 0;
exports.name = 'channelEmpty';
const run = async (client, message) => {
    client.functions.clearBanner(client, message);
    message.channel
        .send(`Disconnected, because no one is in the channel!`)
        .then((msg) => msg.delete({ timeout: 3000 }));
};
exports.run = run;
