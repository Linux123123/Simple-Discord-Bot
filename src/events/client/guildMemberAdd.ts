import { GuildMember, TextChannel } from 'discord.js';
import { RunFunction } from '../../interfaces/Event';
import { GuildSettings } from '../../interfaces/GuildSettings';
export const name: string = 'guildMemberAdd';
export const run: RunFunction = async (client, member: GuildMember) => {
    // Load the guild's settings
    const settings: GuildSettings = client.functions.getSettings(member.guild);
    // If welcome is off, don't proceed (don't welcome the user)
    if (settings.welcomeEnabled !== 'true') return;
    // Replace the placeholders in the welcome message with actual data
    const welcomeMessage = settings.welcomeMessage.replace(
        '{{user}}',
        member.id
    );
    let channel = member.guild.channels.cache.find(
        (c) => c.name === settings.welcomeChannel
    );
    (channel as TextChannel)
        .send(welcomeMessage)
        .catch((e) => client.logger(e, 'error'));
};
