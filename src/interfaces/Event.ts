import { Bot } from '../client/client';
import { EventEmitter } from 'events';
export interface RunFunction {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (client: Bot, ...params: any[]): void;
}
export interface Event {
    name: string;
    run: RunFunction;
    emitter?: EventEmitter;
}
