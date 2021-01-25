import { RunFunction } from '../interfaces/Command';

export const run: RunFunction = async (client, message, args) => {
    if (!args || args.length < 1)
        return message.reply('Must provide a command to reload. Derp.');
    const command =
        client.commands.get(args[0])! ||
        client.commands.get(client.aliases.get(args[0])!);
    let unLoadResponse = await client.functions.unloadCommand(client, args[0]);
    if (unLoadResponse)
        return message.reply(`Error Unloading: ${unLoadResponse}`);

    let loadResponse = await client.functions.loadCommand(
        client,
        `${__dirname}/${command.name}.js`
    );
    if (loadResponse) return message.reply(`Error Loading: ${loadResponse}`);

    message.reply(`The command \`${command.name}\` has been reloaded`);
};
export const name: string = 'reload';

export const conf = {
    aliases: [],
    permLevel: 'Bot Admin',
};

export const help = {
    category: 'System',
    description: 'Reloads a command that"s been modified.',
    usage: 'reload [command]',
};
