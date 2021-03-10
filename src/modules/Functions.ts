import { PlayerEvents, Queue } from 'discord-player';
import { Guild, MessageEmbed, TextChannel } from 'discord.js';
import { Bot } from '../classes/Client';
import { Message } from '../classes/Message';
import { Command } from '../interfaces/Command';
import { Event } from '../interfaces/Event';
import { GuildSettings } from '../interfaces/GuildSettings';
import { Lyrics } from './Lyrics';

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

export class Functions {
    /* PERMISSION LEVEL FUNCTION */
    public permlevel(client: Bot, message: Message): number {
        let permlvl = 0;

        const permOrder = client.config.permLevels
            .slice(0)
            .sort((p, c) => (p.level < c.level ? 1 : -1));

        while (permOrder.length) {
            const currentLevel = permOrder.shift();
            if (!currentLevel) continue;
            if (currentLevel.check(message)) {
                permlvl = currentLevel.level;
                break;
            }
        }
        return permlvl;
    }
    /* GUILD SETTINGS FUNCTION */

    // getSettings merges the client defaults with the guild settings. guild settings in
    // enmap should only have *unique* overrides that are different from defaults.
    public getSettings(client: Bot, guild?: Guild): GuildSettings {
        client.settings.ensure('default', defaultSettings);
        if (!guild) return defaultSettings;
        const guildConf = client.settings.get(guild.id) || {};
        return { ...defaultSettings, ...guildConf };
    }
    /* Loading commands */
    public async loadCommand(client: Bot, commandName: string): Promise<void> {
        try {
            client.logger.log(`Loading Command: ${commandName}`);
            const cmd: Command = await import(`../commands/${commandName}`);
            client.commands.set(cmd.conf.name, cmd);
            cmd.conf.aliases.forEach((alias) => {
                client.aliases.set(alias, cmd.conf.name);
            });
        } catch (e) {
            client.logger.error(`Unable to load command ${commandName}`);
            console.error(e);
        }
    }
    public async unloadCommand(
        client: Bot,
        commandName: string
    ): Promise<boolean | string> {
        try {
            client.logger.log(`Unloading Command: ${commandName}`);
            let command;
            if (client.commands.has(commandName)) {
                command = client.commands.get(commandName);
            } else if (client.aliases.has(commandName)) {
                command = client.commands.get(
                    `${client.aliases.get(commandName)}`
                );
            }
            if (!command)
                return `The command \`${commandName}\` doesn"t seem to exist, nor is it an alias. Try again!`;
            const mod =
                require.cache[
                    require.resolve(`../commands/${command.conf.name}`)
                ];
            if (!mod) return `Can't find the module`;
            delete require.cache[
                require.resolve(`../commands/${command.conf.name}.js`)
            ];
            for (let i = 0; i < (mod.parent?.children.length || 0); i++) {
                if (mod.parent?.children[i] === mod) {
                    mod.parent?.children.splice(i, 1);
                    break;
                }
            }
            return false;
        } catch (e) {
            client.logger.error(
                `Unable to unload command ${commandName}: ${e}`
            );
            console.error(e);
            return e;
        }
    }
    /* Loading events */
    public async loadEvent(client: Bot, eventName: string): Promise<void> {
        try {
            client.logger.log(`Loading Event: ${eventName}`);
            const event: Event = await import(`../events/client/${eventName}`);
            client.on(eventName, event.run.bind(null, client));
        } catch (e) {
            client.logger.error(`Unable to load event ${eventName}`);
            console.error(e);
        }
    }
    public async loadPlayerEvent(
        client: Bot,
        eventName: string
    ): Promise<void> {
        try {
            client.logger.log(`Loading Player Event: ${eventName}`);
            const event: Event = await import(`../events/player/${eventName}`);
            client.player.on(
                eventName as keyof PlayerEvents,
                event.run.bind(null, client)
            );
        } catch (e) {
            client.logger.error(`Unable to load Player Event ${eventName}`);
            console.error(e);
        }
    }
    /* Permission error handling */
    public permissionError(
        client: Bot,
        message: Message,
        cmd: Command
    ): MessageEmbed {
        return client.embed(
            {
                title: 'You do not have permission to use this command.',
                fields: [
                    {
                        name: '\u200b',
                        value: `**Your permission level is ${message.author.level} (${message.author.levelName})**`,
                    },
                    {
                        name: '\u200b',
                        value: `**This command requires level ${
                            client.levelCache[cmd.conf.permLevel]
                        } (${cmd.conf.permLevel})**`,
                    },
                ],
            },
            message
        );
    }
    /*
    SINGLE-LINE AWAITMESSAGE
    const response = await client.awaitReply(msg, "Favourite Color?");
    msg.reply(`Oh, I really love ${response} too!`);
    */
    public async awaitReply(
        msg: Message,
        question: string,
        limit = 60000
    ): Promise<string> {
        const filter = (m: Message) => m.author.id === msg.author.id;
        await msg.channel.send(question);
        const collected = await msg.channel.awaitMessages(filter, {
            max: 1,
            time: limit,
            errors: ['time'],
        });
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return collected.first()!.content;
    }
    /* Music player funtcions */
    public musicUserCheck(
        client: Bot,
        message: Message,
        queueNeeded: boolean
    ): boolean {
        if (!message.member.voice.channel) {
            (message.channel as TextChannel).bulkDelete(1).then(() => {
                message.channel
                    .send(`You're not in a voice channel !`)
                    .then((msg) => msg.delete({ timeout: 3000 }));
            });
            return true;
        }
        if (
            message.guild.me?.voice.channel &&
            message.member.voice.channel.id !==
                message.guild.me?.voice.channel.id
        ) {
            (message.channel as TextChannel).bulkDelete(1).then(() => {
                message.channel
                    .send(`You are not in the same voice channel!`)
                    .then((msg) => msg.delete({ timeout: 3000 }));
            });
            return true;
        }
        if (queueNeeded) {
            if (!client.player.getQueue(message)) {
                (message.channel as TextChannel).bulkDelete(1).then(() => {
                    message.channel
                        .send(`No music currently playing !`)
                        .then((msg) => msg.delete({ timeout: 3000 }));
                });
                return true;
            }
        }
        return false;
    }
    public async clearBanner(client: Bot, message: Message): Promise<void> {
        const channel = await client.channels.fetch(
            message.settings.musicChannelId
        );
        const msg = await (channel as TextChannel).messages.fetch(
            message.settings.musicMsgId
        );

        const embed = new MessageEmbed()
            .setTitle('No song playing currently')
            .setImage(
                'https://bestbots.today/wp-content/uploads/2020/04/Music.png'
            )
            .setFooter(`Prefix for this server is: ${message.settings.prefix}`)
            .setColor(message.settings.embedColor);
        msg.edit('Queue:\n', embed);
    }

    public queueMessage(queue: Queue): string {
        let text = 'Queue:\n';
        for (let i = queue.tracks.length - 1; i >= 1; i--) {
            text += `${i}. ${queue.tracks[i].title}\n`;
        }
        return text;
    }

    public async lyrics(
        client: Bot,
        songname: string,
        embedColor: string
    ): Promise<MessageEmbed> {
        const embed = client.embed({
            color: embedColor,
            timestamp: new Date(),
        });
        try {
            const lyrics = await new Lyrics().find(songname);
            if (lyrics.lyrics.length >= 2048) {
                embed.addField('⠀', lyrics.lyrics.slice(2030));
                lyrics.lyrics = lyrics.lyrics.slice(0, 2030);
            }
            return embed
                .setTitle(lyrics.title)
                .setURL(lyrics.url)
                .setDescription(lyrics.lyrics)
                .setAuthor(lyrics.artists)
                .setImage(lyrics.albumImg);
        } catch (e) {
            return embed.setDescription(e);
        }
    }
}
