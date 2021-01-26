import { Client, MessageEmbed, MessageEmbedOptions } from 'discord.js';
import enmap from 'enmap';
import { Player } from 'discord-player';
import { Command } from '../interfaces/Command';
import { Event } from '../interfaces/Event';
import { Config } from '../interfaces/Config';
import { GuildSettings } from '../interfaces/GuildSettings';
declare class Bot extends Client {
    constructor();
    commands: enmap<string, Command>;
    events: enmap<string, Event>;
    playerEvents: enmap<string, Event>;
    aliases: enmap<string, string>;
    settings: enmap<string, GuildSettings>;
    levelCache: any;
    logger: (content: string, type?: string) => void;
    player: Player;
    config: Config;
    functions: {
        permlevel: (client: Bot, message: import("../classes/Message").Message) => number;
        getSettings: (client: Bot, guild: import("discord.js").Guild) => GuildSettings;
        awaitReply: (msg: import("../classes/Message").Message, question: string, limit?: number) => Promise<string>;
        clean: (client: Bot, text: any) => Promise<any>;
        loadCommand: (client: Bot, commandName: string) => Promise<string | boolean>;
        unloadCommand: (client: Bot, commandName: string) => Promise<string | boolean>;
        musicUserCheck: (client: Bot, message: import("../classes/Message").Message, queueNeeded: boolean) => boolean;
        clearBanner: (client: Bot, message: import("../classes/Message").Message) => Promise<void>;
        queueMessage: (queue: import("../classes/Queue").Queue) => string;
        lyrics: (client: Bot, songname: string, embedColor: string) => Promise<any>;
    };
    start(config: Config): Promise<void>;
    embed(data: MessageEmbedOptions): MessageEmbed;
}
export { Bot };
//# sourceMappingURL=client.d.ts.map