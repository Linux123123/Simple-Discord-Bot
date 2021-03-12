import { RunFunction } from '../interfaces/Command';

export const run: RunFunction = async (client, message) => {
    const role = message.guild.roles.cache.find((r) => r.name === 'secretas');
    if (!role) return;
    message.member.roles.add(role);
};
export const conf = {
    name: 'add-role',
    aliases: [],
    permLevel: 'User',
};

export const help = {
    category: 'System',
    description: 'Clears queue',
    usage: 'clear-queue',
};
