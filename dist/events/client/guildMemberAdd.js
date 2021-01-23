"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.name = void 0;
exports.name = 'guildMemberAdd';
const run = async (client, member) => {
    const settings = client.functions.getSettings(member.guild);
    if (settings.welcomeEnabled !== 'true')
        return;
    const welcomeMessage = settings.welcomeMessage.replace('{{user}}', member.id);
    let channel = member.guild.channels.cache.find((c) => c.name === settings.welcomeChannel);
    channel
        .send(welcomeMessage)
        .catch((e) => client.logger(e, 'error'));
};
exports.run = run;
