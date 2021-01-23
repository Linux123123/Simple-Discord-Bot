import { Message } from 'discord.js';

export interface permCheck {
    (message: Message): boolean | undefined;
}

export interface permObject {
    level: number;
    name: string;
    check: permCheck;
}

export interface Config {
    ownerID: string;
    admins: string[];
    support: string[];
    token: string;
    filters: string[];
    permLevels: permObject[];
}
