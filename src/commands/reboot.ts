import { RunFunction } from '../interfaces/Command';

export const run: RunFunction = async (client, message) => {
    await message.reply('Bot is shutting down.');
    await Promise.all(
        client.commands.map((cmd) =>
            client.functions.unloadCommand(client, cmd.name)
        )
    );
    process.exit(0);
};
export const name: string = 'reboot';

export const conf = {
    aliases: [],
    permLevel: 'Bot Admin',
};

export const help = {
    category: 'System',
    description:
        'Shuts down the bot and starts again if running under server manager.',
    usage: 'reboot',
};
