"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = exports.conf = exports.run = void 0;
const run = async (client, message, args, level) => {
    var _a;
    const friendly = (_a = client.config.permLevels.find((l) => l.level === level)) === null || _a === void 0 ? void 0 : _a.name;
    message.reply(`Your permission level is: ${level} - ${friendly}`);
};
exports.run = run;
exports.conf = {
    name: 'mylevel',
    aliases: [],
    permLevel: 'User',
};
exports.help = {
    category: 'Miscelaneous',
    description: 'Tells you your permission level for the current message location.',
    usage: 'mylevel',
};
