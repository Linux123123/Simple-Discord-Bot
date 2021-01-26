import { Guild } from 'discord.js';
import { Message } from '../classes/Message';
import { Queue } from '../classes/Queue';
import { Bot } from '../client/client';
import { GuildSettings } from '../interfaces/GuildSettings';
export declare const defaultSettings: GuildSettings;
export declare const Functions: {
    permlevel: (client: Bot, message: Message) => number;
    getSettings: (client: Bot, guild: Guild) => GuildSettings;
    awaitReply: (msg: Message, question: string, limit?: number) => Promise<string>;
    clean: (client: Bot, text: any) => Promise<any>;
    loadCommand: (client: Bot, commandName: string) => Promise<boolean | string>;
    unloadCommand: (client: Bot, commandName: string) => Promise<boolean | string>;
    musicUserCheck: (client: Bot, message: Message, queueNeeded: boolean) => boolean;
    clearBanner: (client: Bot, message: Message) => Promise<void>;
    queueMessage: (queue: Queue) => string;
    lyrics: (client: Bot, songname: string, embedColor: string) => Promise<string | any>;
};
//# sourceMappingURL=functions.d.ts.map