import { Message } from '../classes/Message';
import { Filters } from 'discord-player';

export interface permCheck {
    (message: Message): boolean;
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
    filters: Filters[];
    permLevels: permObject[];
}
