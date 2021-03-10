import { RunFunction } from '../interfaces/Command';

export const run: RunFunction = async (client, message) => {
    if (client.functions.musicUserCheck(client, message, true)) return;
    client.player.setRepeatMode(message, false);
    client.player.stop(message);
    const collector = client.reactionCollectors.get(message.guild.id);
    if (!collector) return;
    collector.stop();
    client.functions.clearBanner(client, message);
    message.delete();
    message.channel
        .send(`Music **stopped** !`)
        .then((msg) => msg.delete({ timeout: 3000 }));
};
export const conf = {
    name: 'stop',
    aliases: ['s'],
    permLevel: 'Moderator',
};

export const help = {
    category: 'Music',
    description: 'Stops music',
    usage: 'stop',
};
