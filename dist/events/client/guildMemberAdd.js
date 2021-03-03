"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.name = void 0;
exports.name = 'guildMemberAdd';
const run = async (client, member) => {
    // Load the guild's settings
    const settings = client.functions.getSettings(client, member.guild);
    // If welcome is off, don't proceed (don't welcome the user)
    if (settings.welcomeEnabled !== 'true')
        return;
    // Replace the placeholders in the welcome message with actual data
    const welcomeMessage = settings.welcomeMessage.replace('{{user}}', member.id);
    const channel = member.guild.channels.cache.find((c) => c.name === settings.welcomeChannel);
    channel
        .send(welcomeMessage)
        .catch((e) => client.logger(e, 'error'));
};
exports.run = run;
