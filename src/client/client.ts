import { Client, MessageEmbed, MessageEmbedOptions, Intents } from 'discord.js';
import glob from 'glob';
import { promisify } from 'util';
import enmap from 'enmap';
import { Command } from '../interfaces/Command';
import { Event } from '../interfaces/Event';
import { Config, permObject } from '../interfaces/Config';
import { Logger } from '../modules/logger';
import { Functions } from '../modules/functions';
import { GuildSettings } from '../interfaces/GuildSettings';

const globPromise = promisify(glob);

class Bot extends Client {
    public constructor() {
        super({ ws: { intents: Intents.ALL } });
    }
    public commands: enmap<string, Command> = new enmap();
    public events: enmap<string, Event> = new enmap();
    public aliases: enmap<string, string> = new enmap();
    public settings: enmap<string, GuildSettings> = new enmap('settings');
    public logger = Logger;
    public config!: Config;
    public functions = Functions;
    public levelCache: any = {};
    public async start(config: Config): Promise<void> {
        this.config = config;
        this.login(config.token);
        const commandFiles: string[] = await globPromise(
            `${__dirname}/../commands/**/*.js`
        );
        const eventFiles = await globPromise(
            `${__dirname}/../events/client/*.js`
        );
        commandFiles.map(async (value: string) => {
            this.functions.loadCommand(this, value);
        });
        eventFiles.map(async (eventFile: string) => {
            const ev = (await import(eventFile)) as Event;
            this.logger(`Loading Event: ${ev.name}`);
            this.events.set(ev.name, ev);
            (ev.emitter || this).on(ev.name, ev.run.bind(null, this));
        });
        for (let i = 0; i < this.config.permLevels.length; i++) {
            const thisLevel: permObject = this.config.permLevels[i];
            this.levelCache[thisLevel.name] = thisLevel.level;
        }
    }
    public embed(data: MessageEmbedOptions): MessageEmbed {
        return new MessageEmbed({
            ...data,
        });
    }
}

export { Bot };
