module.exports = (client, error, message) => {
    switch (error) {
        case 'NotPlaying':
            message.channel.send('Music is not being played on this server !');
            break;
        case 'NotConnected':
            message.channel.send(`You aren't connected in any voice channel !`);
            break;
        case 'UnableToJoin':
            message.channel.send(`I can't join your voice channel! (perms?)`);
            break;
        default:
            message.channel.send(`Something went wrong ... Error : ${error}`);
    }
};
