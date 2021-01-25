import { RunFunction } from '../interfaces/Command';

// The EVAL command will execute **ANY** arbitrary javascript code given to it.
// THIS IS PERMISSION LEVEL 10 FOR A REASON! It's perm level 10 because eval
// can be used to do **anything** on your machine, from stealing information to
// purging the hard drive. DO NOT LET ANYONE ELSE USE THIS

// However it's, like, super ultra useful for troubleshooting and doing stuff
// you don't want to put in a command.
export const run: RunFunction = async (client, message, args) => {
    const code = args.join(' ');
    try {
        const evaled = eval(code);
        const clean = await client.functions.clean(client, evaled);
        message.channel.send(`\`\`\`js\n${clean}\n\`\`\``);
    } catch (err) {
        message.channel.send(
            `\`ERROR\` \`\`\`xl\n${await client.functions.clean(
                client,
                err
            )}\n\`\`\``
        );
    }
};
export const name: string = 'eval';

export const conf = {
    aliases: [],
    permLevel: 'Bot Owner',
};

export const help = {
    category: 'System',
    description: 'Evaluates arbitrary javascript.',
    usage: 'eval [...code]',
};
