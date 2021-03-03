import { Message } from '../classes/Message';
import { Bot } from '../client/client';

export interface RunFunction {
    (
        client: Bot,
        message: Message,
        args: string[],
        level: number,
    ): Promise<unknown>;
}
export interface confObject {
    name: string;
    aliases: string[];
    permLevel: string;
}
export interface helpObject {
    category: string;
    description: string;
    usage: string;
}

export interface Command {
    run: RunFunction;
    conf: confObject;
    help: helpObject;
}
