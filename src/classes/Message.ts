import { Message as DiscordMessage } from 'discord.js';
import { GuildSettings } from '../interfaces/GuildSettings';

class Message extends DiscordMessage {
    public settings = {} as GuildSettings;
}

export { Message };
