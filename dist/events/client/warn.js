"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.name = void 0;
exports.name = 'warn';
const run = async (client, info) => {
    client.logger(`An error has accured: \n${JSON.stringify(info)}`, 'warn');
};
exports.run = run;
