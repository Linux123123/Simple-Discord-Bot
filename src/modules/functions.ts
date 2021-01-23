import { Guild, Message } from 'discord.js';
import { Bot } from '../client/client';
import { Command } from '../interfaces/Command';
import { GuildSettings } from '../interfaces/GuildSettings';
// const Musixmatch = require('@raflymln/musixmatch-lyrics');

// THIS IS HERE BECAUSE SOME PEOPLE DELETE ALL THE GUILD SETTINGS
// And then they're stuck because the default settings are also gone.
// So if you do that, you're resetting your defaults. Congrats.

export const defaultSettings: GuildSettings = {
    prefix: '!',
    adminRole: 'Administrator',
    modRole: 'Moderator',
    embedColor: '#ff0000',
    welcomeChannel: 'welcome',
    welcomeMessage:
        'Say hello to {{user}}, everyone! We all need a warm welcome sometimes :D',
    welcomeEnabled: 'false',
    reddit: 'false',
    musicChannelId: '',
    musicMsgId: '',
    lyricsChannelId: '',
};

export const Functions = {
    /* PERMISSION LEVEL FUNCTION */
    permlevel: (client: Bot, message: Message) => {
        let permlvl = 0;

        const permOrder = client.config.permLevels
            .slice(0)
            .sort((p, c) => (p.level < c.level ? 1 : -1));

        while (permOrder.length) {
            const currentLevel = permOrder.shift()!;
            if (currentLevel.check(message)) {
                permlvl = currentLevel.level;
                break;
            }
        }
        return permlvl;
    },
    /* GUILD SETTINGS FUNCTION */

    // getSettings merges the client defaults with the guild settings. guild settings in
    // enmap should only have *unique* overrides that are different from defaults.
    getSettings: (client: Bot, guild: Guild): GuildSettings => {
        client.settings.ensure('default', defaultSettings);
        if (!guild) return client.settings.get('default')!;
        const guildConf = client.settings.get(guild.id) || {};
        return { ...client.settings.get('default')!, ...guildConf };
    },

    /*
    SINGLE-LINE AWAITMESSAGE
    const response = await client.awaitReply(msg, "Favourite Color?");
    msg.reply(`Oh, I really love ${response} too!`);
    */
    awaitReply: async (msg: Message, question: string, limit = 60000) => {
        const filter = (m: Message) => m.author.id === msg.author.id;
        await msg.channel.send(question);
        const collected = await msg.channel.awaitMessages(filter, {
            max: 1,
            time: limit,
            errors: ['time'],
        });
        return collected.first()!.content;
    },
    /*
    MESSAGE CLEAN FUNCTION
    "Clean" removes @everyone pings, as well as tokens, and makes code blocks
    escaped so they're shown more easily. As a bonus it resolves promises
    and stringifies objects!
    This is mostly only used by the Eval and Exec commands.
    */
    clean: async (client: Bot, text: any) => {
        if (text && text.constructor.name == 'Promise') text = await text;
        if (typeof text !== 'string')
            text = require('util').inspect(text, { depth: 1 });

        text = text
            .replace(/`/g, '`' + String.fromCharCode(8203))
            .replace(/@/g, '@' + String.fromCharCode(8203))
            .replace(
                client.token,
                'mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0'
            );

        return text;
    },

    loadCommand: async (client: Bot, commandName: string): Promise<void> => {
        try {
            client.logger(
                `Loading Command: ${commandName.split('/')[8].split('.')[0]}`
            );
            const props: Command = await import(commandName);
            client.commands.set(props.name, props);
            props.conf.aliases.forEach((alias) => {
                client.aliases.set(alias, props.name);
            });
        } catch (e) {
            client.logger(
                `Unable to load command ${commandName}: ${e}`,
                'error'
            );
        }
    },

    unloadCommand: async (client: Bot, commandName: string) => {
        let command;
        if (client.commands.has(commandName)) {
            command = client.commands.get(commandName);
        } else if (client.aliases.has(commandName)) {
            command = client.commands.get(client.aliases.get(commandName)!);
        }
        if (!command)
            return `The command \`${commandName}\` doesn"t seem to exist, nor is it an alias. Try again!`;
        const mod =
            require.cache[require.resolve(`../commands/${command.name}`)];
        delete require.cache[require.resolve(`../commands/${command.name}.js`)];
        for (let i = 0; i < mod!.parent!.children.length; i++) {
            if (mod!.parent!.children[i] === mod) {
                mod.parent!.children.splice(i, 1);
                break;
            }
        }
        return false;
    },

    /* Music player funtcions */

    // client.musicUserCheck = (client, message, queueNeeded) => {
    //     if (!message.member.voice.channel) {
    //         message.channel.bulkDelete(1).then(() => {
    //             message.channel
    //                 .send(`You're not in a voice channel !`)
    //                 .then((msg) => msg.delete({ timeout: 3000 }));
    //         });
    //         return true;
    //     }
    //     if (
    //         message.guild.me.voice.channel &&
    //         message.member.voice.channel.id !==
    //             message.guild.me.voice.channel.id
    //     ) {
    //         message.channel.bulkDelete(1).then(() => {
    //             message.channel
    //                 .send(`You are not in the same voice channel!`)
    //                 .then((msg) => msg.delete({ timeout: 3000 }));
    //         });
    //         return true;
    //     }
    //     if (queueNeeded) {
    //         if (!client.player.getQueue(message)) {
    //             message.channel.bulkDelete(1).then(() => {
    //                 message.channel
    //                     .send(`No music currently playing !`)
    //                     .then((msg) => msg.delete({ timeout: 3000 }));
    //             });
    //             return true;
    //         }
    //     }
    //     return false;
    // };

    // client.clearBanner = async (client, message) => {
    //     let channel = await client.channels.fetch(
    //         message.settings.musicChannelId
    //     );
    //     let msg = await channel.messages.fetch(message.settings.musicMsgId);

    //     const embed = new MessageEmbed()
    //         .setTitle('No song playing currently')
    //         .setImage(
    //             'https://bestbots.today/wp-content/uploads/2020/04/Music.png'
    //         )
    //         .setFooter(`Prefix for this server is: ${message.settings.prefix}`)
    //         .setColor(message.settings.embedColor);
    //     msg.edit('Queue:\n', embed);
    // };

    // client.queueMessage = (queue) => {
    //     let text = 'Queue:\n';
    //     for (let i = queue.tracks.length - 1; i >= 1; i--) {
    //         text += `${i}. ${queue.tracks[i].title}\n`;
    //     }
    //     return text;
    // };

    // client.lyrics = async (songname) => {
    //     try {
    //         let lyrics = await Musixmatch.find(songname);
    //         return await lyrics.lyrics;
    //     } catch (e) {
    //         return e;
    //     }
    // };

    // `await client.wait(1000);` to "pause" for 1 second.
    wait: require('util').promisify(setTimeout),
};
