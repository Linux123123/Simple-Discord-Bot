"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.name = void 0;
exports.name = 'ready';
const run = async (client) => {
    var _a, _b, _c;
    client.logger(`${(_a = client.user) === null || _a === void 0 ? void 0 : _a.tag}, ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`, 'ready');
    (_b = client.user) === null || _b === void 0 ? void 0 : _b.setActivity(`${(_c = client.settings.get('default')) === null || _c === void 0 ? void 0 : _c.prefix}help`, {
        type: 'PLAYING',
    });
};
exports.run = run;
