const { inspect } = require('util');
/*
FOR GUILD SETTINGS SEE set.js !
This command is used to modify the bot's default configuration values, which affects all guilds.
If a default setting is not specifically overwritten by a guild, changing a default here will
change it for that guild. The `add` action adds a key to the configuration of every guild in
your bot. The `del` action removes the key also from every guild, and loses its value forever.
*/
exports.run = async (client, message, [action, key, ...value], level) => {
    // eslint-disable-line no-unused-vars
    // Retrieve Default Values from the default settings in the bot.
    const defaults = client.settings.get('default');
    // Adding a new key adds it to every guild (it will be visible to all of them)
    if (action === 'add') {
        if (!key)
            return message.reply('Please specify a key to add');
        if (defaults[key])
            return message.reply('This key already exists in the default settings');
        if (value.length < 1)
            return message.reply('Please specify a value');
        // `value` being an array, we need to join it first.
        defaults[key] = value.join(' ');
        // One the settings is modified, we write it back to the collection
        client.settings.set('default', defaults);
        message.reply(`${key} successfully added with the value of ${value.join(' ')}`);
    }
    // Changing the default value of a key only modified it for guilds that did not change it to another value.
    else if (action === 'edit') {
        if (!key)
            return message.reply('Please specify a key to edit');
        if (!defaults[key])
            return message.reply('This key does not exist in the settings');
        if (value.length < 1)
            return message.reply('Please specify a new value');
        defaults[key] = value.join(' ');
        client.settings.set('default', defaults);
        message.reply(`${key} successfully edited to ${value.join(' ')}`);
    }
    // WARNING: DELETING A KEY FROM THE DEFAULTS ALSO REMOVES IT FROM EVERY GUILD
    // MAKE SURE THAT KEY IS REALLY NO LONGER NEEDED!
    else if (action === 'del') {
        if (!key)
            return message.reply('Please specify a key to delete.');
        if (!defaults[key])
            return message.reply('This key does not exist in the settings');
        // Throw the 'are you sure?' text at them.
        const response = await client.awaitReply(message, `Are you sure you want to permanently delete ${key} from all guilds? This **CANNOT** be undone.`);
        // If they respond with y or yes, continue.
        if (['y', 'yes'].includes(response)) {
            // We delete the default `key` here.
            delete defaults[key];
            client.settings.set('default', defaults);
            // then we loop on all the guilds and remove this key if it exists.
            // "if it exists" is done with the filter (if the key is present and it's not the default config!)
            for (const [guildid, conf] of client.settings.filter((setting, id) => setting[key] && id !== 'default')) {
                delete conf[key];
                client.settings.set(guildid, conf);
            }
            message.reply(`${key} was successfully deleted.`);
        }
        // If they respond with n or no, we inform them that the action has been cancelled.
        else if (['n', 'no', 'cancel'].includes(response)) {
            message.reply('Action cancelled.');
        }
    }
    // Display a key's default value
    else if (action === 'get') {
        if (!key)
            return message.reply('Please specify a key to view');
        if (!defaults[key])
            return message.reply('This key does not exist in the settings');
        message.reply(`The value of ${key} is currently ${defaults[key]}`);
        // Display all default settings.
    }
    else {
        await message.channel.send(`***__Bot Default Settings__***\n\`\`\`json\n${inspect(defaults)}\n\`\`\``);
    }
};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['defaults'],
    permLevel: 'Bot Admin',
};
exports.help = {
    name: 'conf',
    category: 'System',
    description: 'Modify the default configuration for all guilds.',
    usage: 'conf <view/get/edit> <key> <value>',
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9jb25mLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFcEM7Ozs7OztFQU1FO0FBRUYsT0FBTyxDQUFDLEdBQUcsR0FBRyxLQUFLLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRTtJQUNwRSxxQ0FBcUM7SUFFckMsZ0VBQWdFO0lBQ2hFLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRWhELDhFQUE4RTtJQUM5RSxJQUFJLE1BQU0sS0FBSyxLQUFLLEVBQUU7UUFDbEIsSUFBSSxDQUFDLEdBQUc7WUFBRSxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUM5RCxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUM7WUFDYixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQ2hCLGlEQUFpRCxDQUNwRCxDQUFDO1FBQ04sSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUM7WUFBRSxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUVyRSxvREFBb0Q7UUFDcEQsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFaEMsbUVBQW1FO1FBQ25FLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN6QyxPQUFPLENBQUMsS0FBSyxDQUNULEdBQUcsR0FBRyx5Q0FBeUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUNuRSxD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QUFNLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUN0QiwrQ0FBK0MsT0FBTyxDQUNsRCxRQUFRLENBQ1gsVUFBVSxDQUNkLENBQUM7S0FDTDtBQUNMLENBQUMsQ0FBQztBQUVGLE9BQU8sQ0FBQyxJQUFJLEdBQUc7SUFDWCxPQUFPLEVBQUUsSUFBSTtJQUNiLFNBQVMsRUFBRSxJQUFJO0lBQ2YsT0FBTyxFQUFFLENBQUMsVUFBVSxDQUFDO0lBQ3JCLFNBQVMsRUFBRSxXQUFXO0NBQ3pCLENBQUM7QUFFRixPQUFPLENBQUMsSUFBSSxHQUFHO0lBQ1gsSUFBSSxFQUFFLE1BQU07SUFDWixRQUFRLEVBQUUsUUFBUTtJQUNsQixXQUFXLEVBQUUsa0RBQWtEO0lBQy9ELEtBQUssRUFBRSxvQ0FBb0M7Q0FDOUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgaW5zcGVjdCB9ID0gcmVxdWlyZSgndXRpbCcpO1xuXG4vKlxuRk9SIEdVSUxEIFNFVFRJTkdTIFNFRSBzZXQuanMgIVxuVGhpcyBjb21tYW5kIGlzIHVzZWQgdG8gbW9kaWZ5IHRoZSBib3QncyBkZWZhdWx0IGNvbmZpZ3VyYXRpb24gdmFsdWVzLCB3aGljaCBhZmZlY3RzIGFsbCBndWlsZHMuIFxuSWYgYSBkZWZhdWx0IHNldHRpbmcgaXMgbm90IHNwZWNpZmljYWxseSBvdmVyd3JpdHRlbiBieSBhIGd1aWxkLCBjaGFuZ2luZyBhIGRlZmF1bHQgaGVyZSB3aWxsXG5jaGFuZ2UgaXQgZm9yIHRoYXQgZ3VpbGQuIFRoZSBgYWRkYCBhY3Rpb24gYWRkcyBhIGtleSB0byB0aGUgY29uZmlndXJhdGlvbiBvZiBldmVyeSBndWlsZCBpblxueW91ciBib3QuIFRoZSBgZGVsYCBhY3Rpb24gcmVtb3ZlcyB0aGUga2V5IGFsc28gZnJvbSBldmVyeSBndWlsZCwgYW5kIGxvc2VzIGl0cyB2YWx1ZSBmb3JldmVyLlxuKi9cblxuZXhwb3J0cy5ydW4gPSBhc3luYyAoY2xpZW50LCBtZXNzYWdlLCBbYWN0aW9uLCBrZXksIC4uLnZhbHVlXSwgbGV2ZWwpID0+IHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbiAgICAvLyBSZXRyaWV2ZSBEZWZhdWx0IFZhbHVlcyBmcm9tIHRoZSBkZWZhdWx0IHNldHRpbmdzIGluIHRoZSBib3QuXG4gICAgY29uc3QgZGVmYXVsdHMgPSBjbGllbnQuc2V0dGluZ3MuZ2V0KCdkZWZhdWx0Jyk7XG5cbiAgICAvLyBBZGRpbmcgYSBuZXcga2V5IGFkZHMgaXQgdG8gZXZlcnkgZ3VpbGQgKGl0IHdpbGwgYmUgdmlzaWJsZSB0byBhbGwgb2YgdGhlbSlcbiAgICBpZiAoYWN0aW9uID09PSAnYWRkJykge1xuICAgICAgICBpZiAoIWtleSkgcmV0dXJuIG1lc3NhZ2UucmVwbHkoJ1BsZWFzZSBzcGVjaWZ5IGEga2V5IHRvIGFkZCcpO1xuICAgICAgICBpZiAoZGVmYXVsdHNba2V5XSlcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFxuICAgICAgICAgICAgICAgICdUaGlzIGtleSBhbHJlYWR5IGV4aXN0cyBpbiB0aGUgZGVmYXVsdCBzZXR0aW5ncydcbiAgICAgICAgICAgICk7XG4gICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPCAxKSByZXR1cm4gbWVzc2FnZS5yZXBseSgnUGxlYXNlIHNwZWNpZnkgYSB2YWx1ZScpO1xuXG4gICAgICAgIC8vIGB2YWx1ZWAgYmVpbmcgYW4gYXJyYXksIHdlIG5lZWQgdG8gam9pbiBpdCBmaXJzdC5cbiAgICAgICAgZGVmYXVsdHNba2V5XSA9IHZhbHVlLmpvaW4oJyAnKTtcblxuICAgICAgICAvLyBPbmUgdGhlIHNldHRpbmdzIGlzIG1vZGlmaWVkLCB3ZSB3cml0ZSBpdCBiYWNrIHRvIHRoZSBjb2xsZWN0aW9uXG4gICAgICAgIGNsaWVudC5zZXR0aW5ncy5zZXQoJ2RlZmF1bHQnLCBkZWZhdWx0cyk7XG4gICAgICAgIG1lc3NhZ2UucmVwbHkoXG4gICAgICAgICAgICBgJHtrZXl9IHN1Y2Nlc3NmdWxseSBhZGRlZCB3aXRoIHRoZSB2YWx1ZSBvZiAke3ZhbHVlLmpvaW4oJyAnKX1gXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gQ2hhbmdpbmcgdGhlIGRlZmF1bHQgdmFsdWUgb2YgYSBrZXkgb25seSBtb2RpZmllZCBpdCBmb3IgZ3VpbGRzIHRoYXQgZGlkIG5vdCBjaGFuZ2UgaXQgdG8gYW5vdGhlciB2YWx1ZS5cbiAgICBlbHNlIGlmIChhY3Rpb24gPT09ICdlZGl0Jykge1xuICAgICAgICBpZiAoIWtleSkgcmV0dXJuIG1lc3NhZ2UucmVwbHkoJ1BsZWFzZSBzcGVjaWZ5IGEga2V5IHRvIGVkaXQnKTtcbiAgICAgICAgaWYgKCFkZWZhdWx0c1trZXldKVxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoJ1RoaXMga2V5IGRvZXMgbm90IGV4aXN0IGluIHRoZSBzZXR0aW5ncycpO1xuICAgICAgICBpZiAodmFsdWUubGVuZ3RoIDwgMSlcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KCdQbGVhc2Ugc3BlY2lmeSBhIG5ldyB2YWx1ZScpO1xuXG4gICAgICAgIGRlZmF1bHRzW2tleV0gPSB2YWx1ZS5qb2luKCcgJyk7XG5cbiAgICAgICAgY2xpZW50LnNldHRpbmdzLnNldCgnZGVmYXVsdCcsIGRlZmF1bHRzKTtcbiAgICAgICAgbWVzc2FnZS5yZXBseShgJHtrZXl9IHN1Y2Nlc3NmdWxseSBlZGl0ZWQgdG8gJHt2YWx1ZS5qb2luKCcgJyl9YCk7XG4gICAgfVxuXG4gICAgLy8gV0FSTklORzogREVMRVRJTkcgQSBLRVkgRlJPTSBUSEUgREVGQVVMVFMgQUxTTyBSRU1PVkVTIElUIEZST00gRVZFUlkgR1VJTERcbiAgICAvLyBNQUtFIFNVUkUgVEhBVCBLRVkgSVMgUkVBTExZIE5PIExPTkdFUiBORUVERUQhXG4gICAgZWxzZSBpZiAoYWN0aW9uID09PSAnZGVsJykge1xuICAgICAgICBpZiAoIWtleSkgcmV0dXJuIG1lc3NhZ2UucmVwbHkoJ1BsZWFzZSBzcGVjaWZ5IGEga2V5IHRvIGRlbGV0ZS4nKTtcbiAgICAgICAgaWYgKCFkZWZhdWx0c1trZXldKVxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoJ1RoaXMga2V5IGRvZXMgbm90IGV4aXN0IGluIHRoZSBzZXR0aW5ncycpO1xuXG4gICAgICAgIC8vIFRocm93IHRoZSAnYXJlIHlvdSBzdXJlPycgdGV4dCBhdCB0aGVtLlxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNsaWVudC5hd2FpdFJlcGx5KFxuICAgICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICAgIGBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gcGVybWFuZW50bHkgZGVsZXRlICR7a2V5fSBmcm9tIGFsbCBndWlsZHM/IFRoaXMgKipDQU5OT1QqKiBiZSB1bmRvbmUuYFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIElmIHRoZXkgcmVzcG9uZCB3aXRoIHkgb3IgeWVzLCBjb250aW51ZS5cbiAgICAgICAgaWYgKFsneScsICd5ZXMnXS5pbmNsdWRlcyhyZXNwb25zZSkpIHtcbiAgICAgICAgICAgIC8vIFdlIGRlbGV0ZSB0aGUgZGVmYXVsdCBga2V5YCBoZXJlLlxuICAgICAgICAgICAgZGVsZXRlIGRlZmF1bHRzW2tleV07XG4gICAgICAgICAgICBjbGllbnQuc2V0dGluZ3Muc2V0KCdkZWZhdWx0JywgZGVmYXVsdHMpO1xuXG4gICAgICAgICAgICAvLyB0aGVuIHdlIGxvb3Agb24gYWxsIHRoZSBndWlsZHMgYW5kIHJlbW92ZSB0aGlzIGtleSBpZiBpdCBleGlzdHMuXG4gICAgICAgICAgICAvLyBcImlmIGl0IGV4aXN0c1wiIGlzIGRvbmUgd2l0aCB0aGUgZmlsdGVyIChpZiB0aGUga2V5IGlzIHByZXNlbnQgYW5kIGl0J3Mgbm90IHRoZSBkZWZhdWx0IGNvbmZpZyEpXG4gICAgICAgICAgICBmb3IgKGNvbnN0IFtndWlsZGlkLCBjb25mXSBvZiBjbGllbnQuc2V0dGluZ3MuZmlsdGVyKFxuICAgICAgICAgICAgICAgIChzZXR0aW5nLCBpZCkgPT4gc2V0dGluZ1trZXldICYmIGlkICE9PSAnZGVmYXVsdCdcbiAgICAgICAgICAgICkpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgY29uZltrZXldO1xuICAgICAgICAgICAgICAgIGNsaWVudC5zZXR0aW5ncy5zZXQoZ3VpbGRpZCwgY29uZik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1lc3NhZ2UucmVwbHkoYCR7a2V5fSB3YXMgc3VjY2Vzc2Z1bGx5IGRlbGV0ZWQuYCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdGhleSByZXNwb25kIHdpdGggbiBvciBubywgd2UgaW5mb3JtIHRoZW0gdGhhdCB0aGUgYWN0aW9uIGhhcyBiZWVuIGNhbmNlbGxlZC5cbiAgICAgICAgZWxzZSBpZiAoWyduJywgJ25vJywgJ2NhbmNlbCddLmluY2x1ZGVzKHJlc3BvbnNlKSkge1xuICAgICAgICAgICAgbWVzc2FnZS5yZXBseSgnQWN0aW9uIGNhbmNlbGxlZC4nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIERpc3BsYXkgYSBrZXkncyBkZWZhdWx0IHZhbHVlXG4gICAgZWxzZSBpZiAoYWN0aW9uID09PSAnZ2V0Jykge1xuICAgICAgICBpZiAoIWtleSkgcmV0dXJuIG1lc3NhZ2UucmVwbHkoJ1BsZWFzZSBzcGVjaWZ5IGEga2V5IHRvIHZpZXcnKTtcbiAgICAgICAgaWYgKCFkZWZhdWx0c1trZXldKVxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoJ1RoaXMga2V5IGRvZXMgbm90IGV4aXN0IGluIHRoZSBzZXR0aW5ncycpO1xuICAgICAgICBtZXNzYWdlLnJlcGx5KGBUaGUgdmFsdWUgb2YgJHtrZXl9IGlzIGN1cnJlbnRseSAke2RlZmF1bHRzW2tleV19YCk7XG5cbiAgICAgICAgLy8gRGlzcGxheSBhbGwgZGVmYXVsdCBzZXR0aW5ncy5cbiAgICB9IGVsc2Uge1xuICAgICAgICBhd2FpdCBtZXNzYWdlLmNoYW5uZWwuc2VuZChcbiAgICAgICAgICAgIGAqKipfX0JvdCBEZWZhdWx0IFNldHRpbmdzX18qKipcXG5cXGBcXGBcXGBqc29uXFxuJHtpbnNwZWN0KFxuICAgICAgICAgICAgICAgIGRlZmF1bHRzXG4gICAgICAgICAgICApfVxcblxcYFxcYFxcYGBcbiAgICAgICAgKTtcbiAgICB9XG59O1xuXG5leHBvcnRzLmNvbmYgPSB7XG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICBndWlsZE9ubHk6IHRydWUsXG4gICAgYWxpYXNlczogWydkZWZhdWx0cyddLFxuICAgIHBlcm1MZXZlbDogJ0JvdCBBZG1pbicsXG59O1xuXG5leHBvcnRzLmhlbHAgPSB7XG4gICAgbmFtZTogJ2NvbmYnLFxuICAgIGNhdGVnb3J5OiAnU3lzdGVtJyxcbiAgICBkZXNjcmlwdGlvbjogJ01vZGlmeSB0aGUgZGVmYXVsdCBjb25maWd1cmF0aW9uIGZvciBhbGwgZ3VpbGRzLicsXG4gICAgdXNhZ2U6ICdjb25mIDx2aWV3L2dldC9lZGl0PiA8a2V5PiA8dmFsdWU+Jyxcbn07XG4iXX0=