/* eslint-disable @typescript-eslint/no-non-null-assertion */
import fetch from 'node-fetch';
import entities from 'entities';
import validUrl from 'valid-url';
import { MessageEmbed } from 'discord.js';
import { RunFunction } from '../interfaces/Command';

export const run: RunFunction = async (client, message, args) => {
    let lastPostName: string;
    let url: string;
    const command = message.content
        .slice(message.settings.prefix.length)
        .trim()
        .split(/ +/g)
        .shift()!
        .toLowerCase();
    if (args.length < 1 && command != 'memes') {
        return message.reply('Must provide a subreddit! Derp.');
    }

    client.settings.set(message.guild!.id, 'true', 'reddit');

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
            'Accept': 'application/json',
        },
    };

    client.logger(
        `Retrieving reddit posts on ${message.guild!.name} from r/${
            url.split('/')[4]
        }`,
    );
    const intervalId = setInterval(() => {
        if (client.settings.get(message.guild!.id, 'reddit') == 'false') {
            clearInterval(intervalId);
            client.logger('Stopping reddit retrievals!');
        } else {
            fetch(url, options)
                .then((rawData) => {
                    if (!rawData.ok) {
                        message.reply(
                            'Error retrieving subreddit! Derp. Is it really a real one?',
                        );
                        clearInterval(intervalId);
                        throw 'Retrieving data from reddit failed! Stopping retrievals!';
                    } else return rawData;
                })
                .then((rawData) => {
                    const res = rawData.json();
                    return res;
                })
                .then((res) => {
                    if (res.data.after == null) {
                        message.reply(
                            'Error retrieving subreddit! Derp. Is it really a real one?',
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
                            }${entities.decodeHTML(post.title)}`,
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
                                              : post.selftext,
                                      )
                                    : ''
                            }`,
                        )
                        .setImage(
                            validUrl.isUri(post.url_overridden_by_dest)
                                ? post.url_overridden_by_dest
                                : null,
                        )
                        .setFooter(
                            `${post.is_self ? 'self post' : 'link post'} by ${
                                post.author
                            }`,
                        )
                        .setColor(message.settings.embedColor)
                        .setTimestamp(new Date(post.created_utc * 1000));
                    message.channel.send(embed);
                    lastPostName = post.name;
                })
                .catch((err) => {
                    if (err != 'Alrd sent') {
                        client.settings.set(
                            message.guild!.id,
                            'false',
                            'reddit',
                        );
                        client.logger(err, 'error');
                    }
                });
        }
    }, 2 * 1000); // 2 Seconds
};
export const conf = {
    name: 'reddit',
    aliases: ['memes'],
    permLevel: 'Moderator',
};

export const help = {
    category: 'Reddit',
    description: 'A subreddit in your channel!',
    usage: 'reddit subreddit\nmemes',
};
