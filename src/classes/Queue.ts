import { Queue as playerQueue } from 'discord-player';
import { ReactionCollector } from 'discord.js';

class Queue extends playerQueue {
    public collector!: ReactionCollector;
}

export { Queue };
