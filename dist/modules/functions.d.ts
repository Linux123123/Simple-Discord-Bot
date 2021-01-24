import { Guild } from 'discord.js';
import { Message } from '../classes/Message';
import { Bot } from '../client/client';
import { GuildSettings } from '../interfaces/GuildSettings';
export declare const defaultSettings: GuildSettings;
export declare const Functions: {
    permlevel: (client: Bot, message: Message) => number;
    getSettings: (client: Bot, guild: Guild) => GuildSettings;
    awaitReply: (msg: Message, question: string, limit?: number) => Promise<string>;
    clean: (client: Bot, text: any) => Promise<any>;
    loadCommand: (client: Bot, commandName: string) => Promise<void>;
    unloadCommand: (client: Bot, commandName: string) => Promise<string | false>;
    wait: any;
};
//# sourceMappingURL=functions.d.ts.map