"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.name = void 0;
exports.name = 'noResults';
const run = (client, message, query) => {
    message.channel
        .send(`No results found for ${query} !`)
        .then((msg) => msg.delete({ timeout: 3000 }));
};
exports.run = run;
