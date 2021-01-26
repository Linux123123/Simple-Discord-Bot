"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.name = void 0;
exports.name = 'queueEnd';
const run = (client, message) => {
    client.player.getQueue(message).collector.stop();
    client.functions.clearBanner(client, message);
};
exports.run = run;
