const fetch = require('node-fetch');
const entities = require('entities');
const validUrl = require('valid-url');
const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args, level) => {
    let lastPostName = '';
    let url;
    const command = message.content
        .slice(message.settings.prefix.length)
        .trim()
        .split(/ +/g)
        .shift()
        .toLowerCase();
    if (args < 1 && command != 'memes') {
        return message.reply('Must provide a subreddit! Derp.');
    }

    client.settings.set(message.guild.id, 'true', 'reddit');

    if (command == 'memes') {
        url = 'https://www.reddit.com/r/memes/new.json?limit=1';
    } else {
        url = `https://www.reddit.com/r/${args[0].toLowerCase()}/new.json?limit=1`;
    }

    const options = {
        responseEncoding: 'utf8',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    };

    client.logger.log(
        `Retrieving reddit posts on ${message.guild.name} from r/${
            url.split('/')[4]
        }`
    );
    let intervalId = setInterval(() => {
        if (client.settings.get(message.guild.id, 'reddit') == 'false') {
            clearInterval(intervalId);
            throw 'Stopping reddit retrievals!';
        }
        fetch(url, options)
            .then((rawData) => {
                if (!rawData.ok) {
                    message.reply(
                        'Error retrieving subreddit! Derp. Is it really a real one?'
                    );
                    clearInterval(intervalId);
                    throw 'Retrieving data from reddit failed! Stopping retrievals!';
                } else return rawData;
            })
            .then((rawData) => {
                let res = rawData.json();
                return res;
            })
            .then((res) => {
                if (res.data.after == null) {
                    message.reply(
                        'Error retrieving subreddit! Derp. Is it really a real one?'
                    );
                    clearInterval(intervalId);
                    throw 'Retrieving data from reddit failed! Stopping retrievals!';
                }
                const post = res.data.children[0].data;
                if (post.name == lastPostName) {
                    throw 'Alrd sent';
                }
                const embed = new MessageEmbed()
                    .setTitle(
                        `${
                            post.link_flair_text
                                ? `[${post.link_flair_text}] `
                                : ''
                        }${entities.decodeHTML(post.title)}`
                    )
                    .setURL(`https://redd.it/${post.id}`)
                    .setDescription(
                        `${
                            post.is_self
                                ? entities.decodeHTML(
                                      post.selftext.length > 253
                                          ? post.selftext
                                                .slice(0, 253)
                                                .concat('...')
                                          : post.selftext
                                  )
                                : ''
                        }`
                    )
                    .setImage(
                        validUrl.isUri(post.url_overridden_by_dest)
                            ? post.url_overridden_by_dest
                            : null
                    )
                    .setFooter(
                        `${post.is_self ? 'self post' : 'link post'} by ${
                            post.author
                        }`
                    )
                    .setColor(message.settings.embedColor)
                    .setTimestamp(new Date(post.created_utc * 1000));
                message.channel.send(embed);
                lastPostName = post.name;
            })
            .catch((err) => {
                if (!(err == 'Alrd sent')) {
                    client.settings.set(message.guild.id, 'false', 'reddit');
                    client.logger.error(err);
                }
            });
    }, 2 * 1000); // 2 Seconds
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['memes'],
    permLevel: 'Moderator',
};

exports.help = {
    name: 'reddit',
    category: 'Reddit',
    description: 'A subreddit in your channel!',
    usage: 'reddit subreddit\nmemes',
};
