import enmap from 'enmap';
import { Client, MessageEmbed, MessageEmbedOptions, Intents } from 'discord.js';
import { promisify } from 'util';
import { readdir } from 'fs';
import { Player } from 'discord-player';
import { Command } from '../interfaces/Command';
import { Config, permObject } from '../interfaces/Config';
import { Logger } from '../modules/Logger';
import { Functions } from '../modules/Functions';
import { GuildSettings } from '../interfaces/GuildSettings';
import { Message } from './Message';
import { handleExceptions } from '../modules/handleExceptions';

const readAsyncDir = promisify(readdir);

export class Bot extends Client {
    public constructor(public readonly config: Config) {
        super({ ws: { intents: Intents.NON_PRIVILEGED } });
    }
    public commands: enmap<string, Command> = new enmap();
    public aliases: enmap<string, string> = new enmap();
    public settings: enmap<string, GuildSettings> = new enmap('settings');
    public levelCache: { [key: string]: number } = {};
    public logger = new Logger();
    public player = new Player(this);
    public functions = new Functions();
    public async start(): Promise<void> {
        const config = this.config;
        handleExceptions(this);
        this.login(config.token);
        const cmdFiles = await readAsyncDir(`${__dirname}/../commands`);
        const eventFiles = await readAsyncDir(`${__dirname}/../events/client/`);
        const playerEventFiles = await readAsyncDir(
            `${__dirname}/../events/player`,
        );
        cmdFiles.forEach((cmd) =>
            this.functions.loadCommand(this, cmd.split('.')[0]),
        );
        eventFiles.forEach((event) =>
            this.functions.loadEvent(this, event.split('.')[0]),
        );
        playerEventFiles.forEach((eventFile: string) => {
            this.functions.loadPlayerEvent(this, eventFile.split('.')[0]);
        });
        for (let i = 0; i < this.config.permLevels.length; i++) {
            const thisLevel: permObject = this.config.permLevels[i];
            this.levelCache[thisLevel.name] = thisLevel.level;
        }
    }
    public embed(
        data: MessageEmbedOptions,
        message?: Message,
        embedColor = '#0000FF',
    ): MessageEmbed {
        return new MessageEmbed({
            ...data,
            color: message ? message.settings.embedColor : embedColor,
            timestamp: new Date(),
        });
    }
}
