import { Client, MessageEmbed, MessageEmbedOptions } from 'discord.js';
import enmap from 'enmap';
import { Command } from '../interfaces/Command';
import { Event } from '../interfaces/Event';
import { Config } from '../interfaces/Config';
import { GuildSettings } from '../interfaces/GuildSettings';
declare class Bot extends Client {
    constructor();
    commands: enmap<string, Command>;
    events: enmap<string, Event>;
    aliases: enmap<string, string>;
    settings: enmap<string, GuildSettings>;
    logger: (content: string, type?: string) => void;
    config: Config;
    functions: {
        permlevel: (client: Bot, message: import("../classes/Message").Message) => number;
        getSettings: (client: Bot, guild: import("discord.js").Guild) => GuildSettings;
        awaitReply: (msg: import("../classes/Message").Message, question: string, limit?: number) => Promise<string>;
        clean: (client: Bot, text: any) => Promise<any>;
        loadCommand: (client: Bot, commandName: string) => Promise<void>;
        unloadCommand: (client: Bot, commandName: string) => Promise<string | false>;
        wait: any;
    };
    levelCache: any;
    start(config: Config): Promise<void>;
    embed(data: MessageEmbedOptions): MessageEmbed;
}
export { Bot };
//# sourceMappingURL=client.d.ts.map