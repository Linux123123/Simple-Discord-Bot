// This command is to modify/edit guild configuration. Perm Level 3 for admins
// and owners only. Used for changing prefixes and role names and such.
// Note that there's no "checks" in this basic version - no config "types" like
// Role, String, Int, etc... It's basic, to be extended with your deft hands!
// Note the **destructuring** here. instead of `args` we have :
// [action, key, ...value]
// This gives us the equivalent of either:
// const action = args[0]; const key = args[1]; const value = args.slice(2);
// OR the same as:
// const [action, key, ...value] = args;
exports.run = async (client, message, [action, key, ...value], level) => {
    // eslint-disable-line no-unused-vars
    // Retrieve current guild settings (merged) and overrides only.
    const settings = message.settings;
    const defaults = client.settings.get('default');
    const overrides = client.settings.get(message.guild.id);
    if (!client.settings.has(message.guild.id))
        client.settings.set(message.guild.id, {});
    // Edit an existing key value
    if (action === 'edit') {
        // User must specify a key.
        if (!key)
            return message.reply('Please specify a key to edit');
        // User must specify a key that actually exists!
        if (!defaults[key])
            return message.reply('This key does not exist in the settings');
        const joinedValue = value.join(' ');
        // User must specify a value to change.
        if (joinedValue.length < 1)
            return message.reply('Please specify a new value');
        // User must specify a different value than the current one.
        if (joinedValue === settings[key])
            return message.reply('This setting already has that value!');
        // If the guild does not have any overrides, initialize it.
        if (!client.settings.has(message.guild.id))
            client.settings.set(message.guild.id, {});
        // Modify the guild overrides directly.
        client.settings.set(message.guild.id, joinedValue, key);
        // Confirm everything is fine!
        message.reply(`${key} successfully edited to ${joinedValue}`);
    }
    // Resets a key to the default value
    else if (action === 'del' || action === 'reset') {
        if (!key)
            return message.reply('Please specify a key to reset.');
        if (!defaults[key])
            return message.reply('This key does not exist in the settings');
        if (!overrides[key])
            return message.reply('This key does not have an override and is already using defaults.');
        // Good demonstration of the custom awaitReply method in `./modules/functions.js` !
        const response = await client.awaitReply(message, `Are you sure you want to reset ${key} to the default value?`);
        // If they respond with y or yes, continue.
        if (['y', 'yes'].includes(response.toLowerCase())) {
            // We delete the `key` here.
            client.settings.delete(message.guild.id, key);
            message.reply(`${key} was successfully reset to default.`);
        }
        // If they respond with n or no, we inform them that the action has been cancelled.
        else if (['n', 'no', 'cancel'].includes(response)) {
            message.reply(`Your setting for \`${key}\` remains at \`${settings[key]}\``);
        }
    }
    else if (action === 'get') {
        if (!key)
            return message.reply('Please specify a key to view');
        if (!defaults[key])
            return message.reply('This key does not exist in the settings');
        const isDefault = !overrides[key]
            ? '\nThis is the default global default value.'
            : '';
        message.reply(`The value of ${key} is currently ${settings[key]}${isDefault}`);
    }
    else {
        // Otherwise, the default action is to return the whole configuration;
        const array = [];
        Object.entries(settings).forEach(([key, value]) => {
            array.push(`${key}${' '.repeat(20 - key.length)}::  ${value}`);
        });
        await message.channel.send(`= Current Guild Settings =\n${array.join('\n')}`, { code: 'asciidoc' });
    }
};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['setting', 'settings', 'conf'],
    permLevel: 'Administrator',
};
exports.help = {
    name: 'set',
    category: 'System',
    description: 'View or change settings for your server.',
    usage: 'set <view/get/edit> <key> <value>',
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3NldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw4RUFBOEU7QUFDOUUsdUVBQXVFO0FBRXZFLCtFQUErRTtBQUMvRSw2RUFBNkU7QUFFN0UsK0RBQStEO0FBQy9ELDBCQUEwQjtBQUMxQiwwQ0FBMEM7QUFDMUMsNEVBQTRFO0FBQzVFLGtCQUFrQjtBQUNsQix3Q0FBd0M7QUFDeEMsT0FBTyxDQUFDLEdBQUcsR0FBRyxLQUFLLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRTtJQUNwRSxxQ0FBcUM7SUFFckMsK0RBQStEO0lBQy9ELE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7SUFDbEMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEQsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN4RCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDdEMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFOUMsNkJBQTZCO0lBQzdCLElBQUksTUFBTSxLQUFLLE1BQU0sRUFBRTtRQUNuQiwyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLEdBQUc7WUFBRSxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQztRQUMvRCxnREFBZ0Q7UUFDaEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENB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QWlCLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FDbEUsQ0FBQztLQUNMO1NBQU07UUFDSCxzRUFBc0U7UUFDdEUsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRTtZQUM5QyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ25FLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDdEIsK0JBQStCLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFDakQsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7S0FDTDtBQUNMLENBQUMsQ0FBQztBQUVGLE9BQU8sQ0FBQyxJQUFJLEdBQUc7SUFDWCxPQUFPLEVBQUUsSUFBSTtJQUNiLFNBQVMsRUFBRSxJQUFJO0lBQ2YsT0FBTyxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLENBQUM7SUFDeEMsU0FBUyxFQUFFLGVBQWU7Q0FDN0IsQ0FBQztBQUVGLE9BQU8sQ0FBQyxJQUFJLEdBQUc7SUFDWCxJQUFJLEVBQUUsS0FBSztJQUNYLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLFdBQVcsRUFBRSwwQ0FBMEM7SUFDdkQsS0FBSyxFQUFFLG1DQUFtQztDQUM3QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhpcyBjb21tYW5kIGlzIHRvIG1vZGlmeS9lZGl0IGd1aWxkIGNvbmZpZ3VyYXRpb24uIFBlcm0gTGV2ZWwgMyBmb3IgYWRtaW5zXG4vLyBhbmQgb3duZXJzIG9ubHkuIFVzZWQgZm9yIGNoYW5naW5nIHByZWZpeGVzIGFuZCByb2xlIG5hbWVzIGFuZCBzdWNoLlxuXG4vLyBOb3RlIHRoYXQgdGhlcmUncyBubyBcImNoZWNrc1wiIGluIHRoaXMgYmFzaWMgdmVyc2lvbiAtIG5vIGNvbmZpZyBcInR5cGVzXCIgbGlrZVxuLy8gUm9sZSwgU3RyaW5nLCBJbnQsIGV0Yy4uLiBJdCdzIGJhc2ljLCB0byBiZSBleHRlbmRlZCB3aXRoIHlvdXIgZGVmdCBoYW5kcyFcblxuLy8gTm90ZSB0aGUgKipkZXN0cnVjdHVyaW5nKiogaGVyZS4gaW5zdGVhZCBvZiBgYXJnc2Agd2UgaGF2ZSA6XG4vLyBbYWN0aW9uLCBrZXksIC4uLnZhbHVlXVxuLy8gVGhpcyBnaXZlcyB1cyB0aGUgZXF1aXZhbGVudCBvZiBlaXRoZXI6XG4vLyBjb25zdCBhY3Rpb24gPSBhcmdzWzBdOyBjb25zdCBrZXkgPSBhcmdzWzFdOyBjb25zdCB2YWx1ZSA9IGFyZ3Muc2xpY2UoMik7XG4vLyBPUiB0aGUgc2FtZSBhczpcbi8vIGNvbnN0IFthY3Rpb24sIGtleSwgLi4udmFsdWVdID0gYXJncztcbmV4cG9ydHMucnVuID0gYXN5bmMgKGNsaWVudCwgbWVzc2FnZSwgW2FjdGlvbiwga2V5LCAuLi52YWx1ZV0sIGxldmVsKSA9PiB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG4gICAgLy8gUmV0cmlldmUgY3VycmVudCBndWlsZCBzZXR0aW5ncyAobWVyZ2VkKSBhbmQgb3ZlcnJpZGVzIG9ubHkuXG4gICAgY29uc3Qgc2V0dGluZ3MgPSBtZXNzYWdlLnNldHRpbmdzO1xuICAgIGNvbnN0IGRlZmF1bHRzID0gY2xpZW50LnNldHRpbmdzLmdldCgnZGVmYXVsdCcpO1xuICAgIGNvbnN0IG92ZXJyaWRlcyA9IGNsaWVudC5zZXR0aW5ncy5nZXQobWVzc2FnZS5ndWlsZC5pZCk7XG4gICAgaWYgKCFjbGllbnQuc2V0dGluZ3MuaGFzKG1lc3NhZ2UuZ3VpbGQuaWQpKVxuICAgICAgICBjbGllbnQuc2V0dGluZ3Muc2V0KG1lc3NhZ2UuZ3VpbGQuaWQsIHt9KTtcblxuICAgIC8vIEVkaXQgYW4gZXhpc3Rpbmcga2V5IHZhbHVlXG4gICAgaWYgKGFjdGlvbiA9PT0gJ2VkaXQnKSB7XG4gICAgICAgIC8vIFVzZXIgbXVzdCBzcGVjaWZ5IGEga2V5LlxuICAgICAgICBpZiAoIWtleSkgcmV0dXJuIG1lc3NhZ2UucmVwbHkoJ1BsZWFzZSBzcGVjaWZ5IGEga2V5IHRvIGVkaXQnKTtcbiAgICAgICAgLy8gVXNlciBtdXN0IHNwZWNpZnkgYSBrZXkgdGhhdCBhY3R1YWxseSBleGlzdHMhXG4gICAgICAgIGlmICghZGVmYXVsdHNba2V5XSlcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KCdUaGlzIGtleSBkb2VzIG5vdCBleGlzdCBpbiB0aGUgc2V0dGluZ3MnKTtcbiAgICAgICAgY29uc3Qgam9pbmVkVmFsdWUgPSB2YWx1ZS5qb2luKCcgJyk7XG4gICAgICAgIC8vIFVzZXIgbXVzdCBzcGVjaWZ5IGEgdmFsdWUgdG8gY2hhbmdlLlxuICAgICAgICBpZiAoam9pbmVkVmFsdWUubGVuZ3RoIDwgMSlcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KCdQbGVhc2Ugc3BlY2lmeSBhIG5ldyB2YWx1ZScpO1xuICAgICAgICAvLyBVc2VyIG11c3Qgc3BlY2lmeSBhIGRpZmZlcmVudCB2YWx1ZSB0aGFuIHRoZSBjdXJyZW50IG9uZS5cbiAgICAgICAgaWYgKGpvaW5lZFZhbHVlID09PSBzZXR0aW5nc1trZXldKVxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoJ1RoaXMgc2V0dGluZyBhbHJlYWR5IGhhcyB0aGF0IHZhbHVlIScpO1xuXG4gICAgICAgIC8vIElmIHRoZSBndWlsZCBkb2VzIG5vdCBoYXZlIGFueSBvdmVycmlkZXMsIGluaXRpYWxpemUgaXQuXG4gICAgICAgIGlmICghY2xpZW50LnNldHRpbmdzLmhhcyhtZXNzYWdlLmd1aWxkLmlkKSlcbiAgICAgICAgICAgIGNsaWVudC5zZXR0aW5ncy5zZXQobWVzc2FnZS5ndWlsZC5pZCwge30pO1xuXG4gICAgICAgIC8vIE1vZGlmeSB0aGUgZ3VpbGQgb3ZlcnJpZGVzIGRpcmVjdGx5LlxuICAgICAgICBjbGllbnQuc2V0dGluZ3Muc2V0KG1lc3NhZ2UuZ3VpbGQuaWQsIGpvaW5lZFZhbHVlLCBrZXkpO1xuXG4gICAgICAgIC8vIENvbmZpcm0gZXZlcnl0aGluZyBpcyBmaW5lIVxuICAgICAgICBtZXNzYWdlLnJlcGx5KGAke2tleX0gc3VjY2Vzc2Z1bGx5IGVkaXRlZCB0byAke2pvaW5lZFZhbHVlfWApO1xuICAgIH1cblxuICAgIC8vIFJlc2V0cyBhIGtleSB0byB0aGUgZGVmYXVsdCB2YWx1ZVxuICAgIGVsc2UgaWYgKGFjdGlvbiA9PT0gJ2RlbCcgfHwgYWN0aW9uID09PSAncmVzZXQnKSB7XG4gICAgICAgIGlmICgha2V5KSByZXR1cm4gbWVzc2FnZS5yZXBseSgnUGxlYXNlIHNwZWNpZnkgYSBrZXkgdG8gcmVzZXQuJyk7XG4gICAgICAgIGlmICghZGVmYXVsdHNba2V5XSlcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KCdUaGlzIGtleSBkb2VzIG5vdCBleGlzdCBpbiB0aGUgc2V0dGluZ3MnKTtcbiAgICAgICAgaWYgKCFvdmVycmlkZXNba2V5XSlcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFxuICAgICAgICAgICAgICAgICdUaGlzIGtleSBkb2VzIG5vdCBoYXZlIGFuIG92ZXJyaWRlIGFuZCBpcyBhbHJlYWR5IHVzaW5nIGRlZmF1bHRzLidcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgLy8gR29vZCBkZW1vbnN0cmF0aW9uIG9mIHRoZSBjdXN0b20gYXdhaXRSZXBseSBtZXRob2QgaW4gYC4vbW9kdWxlcy9mdW5jdGlvbnMuanNgICFcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjbGllbnQuYXdhaXRSZXBseShcbiAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICBgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHJlc2V0ICR7a2V5fSB0byB0aGUgZGVmYXVsdCB2YWx1ZT9gXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gSWYgdGhleSByZXNwb25kIHdpdGggeSBvciB5ZXMsIGNvbnRpbnVlLlxuICAgICAgICBpZiAoWyd5JywgJ3llcyddLmluY2x1ZGVzKHJlc3BvbnNlLnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICAgICAgICAvLyBXZSBkZWxldGUgdGhlIGBrZXlgIGhlcmUuXG4gICAgICAgICAgICBjbGllbnQuc2V0dGluZ3MuZGVsZXRlKG1lc3NhZ2UuZ3VpbGQuaWQsIGtleSk7XG4gICAgICAgICAgICBtZXNzYWdlLnJlcGx5KGAke2tleX0gd2FzIHN1Y2Nlc3NmdWxseSByZXNldCB0byBkZWZhdWx0LmApO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIHRoZXkgcmVzcG9uZCB3aXRoIG4gb3Igbm8sIHdlIGluZm9ybSB0aGVtIHRoYXQgdGhlIGFjdGlvbiBoYXMgYmVlbiBjYW5jZWxsZWQuXG4gICAgICAgIGVsc2UgaWYgKFsnbicsICdubycsICdjYW5jZWwnXS5pbmNsdWRlcyhyZXNwb25zZSkpIHtcbiAgICAgICAgICAgIG1lc3NhZ2UucmVwbHkoXG4gICAgICAgICAgICAgICAgYFlvdXIgc2V0dGluZyBmb3IgXFxgJHtrZXl9XFxgIHJlbWFpbnMgYXQgXFxgJHtzZXR0aW5nc1trZXldfVxcYGBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PT0gJ2dldCcpIHtcbiAgICAgICAgaWYgKCFrZXkpIHJldHVybiBtZXNzYWdlLnJlcGx5KCdQbGVhc2Ugc3BlY2lmeSBhIGtleSB0byB2aWV3Jyk7XG4gICAgICAgIGlmICghZGVmYXVsdHNba2V5XSlcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KCdUaGlzIGtleSBkb2VzIG5vdCBleGlzdCBpbiB0aGUgc2V0dGluZ3MnKTtcbiAgICAgICAgY29uc3QgaXNEZWZhdWx0ID0gIW92ZXJyaWRlc1trZXldXG4gICAgICAgICAgICA/ICdcXG5UaGlzIGlzIHRoZSBkZWZhdWx0IGdsb2JhbCBkZWZhdWx0IHZhbHVlLidcbiAgICAgICAgICAgIDogJyc7XG4gICAgICAgIG1lc3NhZ2UucmVwbHkoXG4gICAgICAgICAgICBgVGhlIHZhbHVlIG9mICR7a2V5fSBpcyBjdXJyZW50bHkgJHtzZXR0aW5nc1trZXldfSR7aXNEZWZhdWx0fWBcbiAgICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBPdGhlcndpc2UsIHRoZSBkZWZhdWx0IGFjdGlvbiBpcyB0byByZXR1cm4gdGhlIHdob2xlIGNvbmZpZ3VyYXRpb247XG4gICAgICAgIGNvbnN0IGFycmF5ID0gW107XG4gICAgICAgIE9iamVjdC5lbnRyaWVzKHNldHRpbmdzKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgICAgIGFycmF5LnB1c2goYCR7a2V5fSR7JyAnLnJlcGVhdCgyMCAtIGtleS5sZW5ndGgpfTo6ICAke3ZhbHVlfWApO1xuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgbWVzc2FnZS5jaGFubmVsLnNlbmQoXG4gICAgICAgICAgICBgPSBDdXJyZW50IEd1aWxkIFNldHRpbmdzID1cXG4ke2FycmF5LmpvaW4oJ1xcbicpfWAsXG4gICAgICAgICAgICB7IGNvZGU6ICdhc2NpaWRvYycgfVxuICAgICAgICApO1xuICAgIH1cbn07XG5cbmV4cG9ydHMuY29uZiA9IHtcbiAgICBlbmFibGVkOiB0cnVlLFxuICAgIGd1aWxkT25seTogdHJ1ZSxcbiAgICBhbGlhc2VzOiBbJ3NldHRpbmcnLCAnc2V0dGluZ3MnLCAnY29uZiddLFxuICAgIHBlcm1MZXZlbDogJ0FkbWluaXN0cmF0b3InLFxufTtcblxuZXhwb3J0cy5oZWxwID0ge1xuICAgIG5hbWU6ICdzZXQnLFxuICAgIGNhdGVnb3J5OiAnU3lzdGVtJyxcbiAgICBkZXNjcmlwdGlvbjogJ1ZpZXcgb3IgY2hhbmdlIHNldHRpbmdzIGZvciB5b3VyIHNlcnZlci4nLFxuICAgIHVzYWdlOiAnc2V0IDx2aWV3L2dldC9lZGl0PiA8a2V5PiA8dmFsdWU+Jyxcbn07XG4iXX0=