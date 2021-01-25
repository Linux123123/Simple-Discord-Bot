import { Message as DiscordMessage } from 'discord.js';
import { GuildSettings } from '../interfaces/GuildSettings';
declare class Message extends DiscordMessage {
    settings: GuildSettings;
}
export { Message };
//# sourceMappingURL=Message.d.ts.map