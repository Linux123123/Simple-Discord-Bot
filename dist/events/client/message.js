"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.name = void 0;
exports.name = 'message';
const run = async (client, message) => {
    var _a, _b, _c, _d;
    if (message.author.bot || !message.guild)
        return; // Don't listen to yourself
    const settings = (message.settings = client.functions.getSettings(client, message.guild)); // Grab the settings for this server
    // Checks if the bot was mentioned, with no message after it, returns the prefix.
    const prefixMention = new RegExp(`^<@!?${(_a = client.user) === null || _a === void 0 ? void 0 : _a.id}>( |)$`);
    if (message.content.match(prefixMention))
        return message.reply(`My prefix is \`${settings.prefix}\``);
    if (message.channel.id === settings.musicChannelId) {
        if (message.content.indexOf(settings.prefix) !== 0) {
            message.channel.bulkDelete(1);
            const args = message.content.trim();
            client.player.play(message, args, true);
            const level = client.functions.permlevel(client, message);
            client.logger(`${(_b = client.config.permLevels.find((l) => l.level === level)) === null || _b === void 0 ? void 0 : _b.name} ${message.author.username} (${message.author.id}) ran command play`, 'cmd');
        }
    }
    if (message.content.indexOf(settings.prefix) !== 0)
        return; // Ignore without prefix
    // Get command and split all the arguments
    const args = message.content
        .slice(settings.prefix.length)
        .trim()
        .split(/ +/g);
    const command = args.shift().toLowerCase();
    // If the member on a guild is invisible or not cached, fetch them.
    if (message.guild && !message.member)
        await message.guild.members.fetch(message.author);
    // Get the user or member's permission level from the elevation
    const level = client.functions.permlevel(client, message);
    // Check whether the command, or alias, exist
    const cmd = client.commands.get(command) ||
        client.commands.get(client.aliases.get(command));
    if (!cmd)
        return;
    // Check permissions
    if (level < client.levelCache[cmd.conf.permLevel]) {
        return message.channel
            .send(`You do not have permission to use this command.
  Your permission level is ${level} (${(_c = client.config.permLevels.find((l) => l.level === level)) === null || _c === void 0 ? void 0 : _c.name})
  This command requires level ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`);
    }
    // If the command exists, **AND** the user has permission, run it.
    client.logger(`${(_d = client.config.permLevels.find((l) => l.level === level)) === null || _d === void 0 ? void 0 : _d.name} ${message.author.username} (${message.author.id}) ran command ${cmd.conf.name}`, 'cmd');
    cmd.run(client, message, args, level);
};
exports.run = run;
