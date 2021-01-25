"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = exports.conf = exports.name = exports.run = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const entities = require('entities');
const valid_url_1 = __importDefault(require("valid-url"));
const discord_js_1 = require("discord.js");
const run = async (client, message, args) => {
    let lastPostName;
    let url;
    const command = message.content
        .slice(message.settings.prefix.length)
        .trim()
        .split(/ +/g)
        .shift()
        .toLowerCase();
    if (args.length < 1 && command != 'memes') {
        return message.reply('Must provide a subreddit! Derp.');
    }
    client.settings.set(message.guild.id, 'true', 'reddit');
    if (command == 'memes') {
        url = 'https://www.reddit.com/r/memes/new.json?limit=1';
    }
    else {
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
    client.logger(`Retrieving reddit posts on ${message.guild.name} from r/${url.split('/')[4]}`);
    let intervalId = setInterval(() => {
        if (client.settings.get(message.guild.id, 'reddit') == 'false') {
            clearInterval(intervalId);
            client.logger('Stopping reddit retrievals!');
        }
        else {
            node_fetch_1.default(url, options)
                .then((rawData) => {
                if (!rawData.ok) {
                    message.reply('Error retrieving subreddit! Derp. Is it really a real one?');
                    clearInterval(intervalId);
                    throw 'Retrieving data from reddit failed! Stopping retrievals!';
                }
                else
                    return rawData;
            })
                .then((rawData) => {
                let res = rawData.json();
                return res;
            })
                .then((res) => {
                if (res.data.after == null) {
                    message.reply('Error retrieving subreddit! Derp. Is it really a real one?');
                    clearInterval(intervalId);
                    throw 'Retrieving data from reddit failed! Stopping retrievals!';
                }
                const post = res.data.children[0].data;
                if (post.name == lastPostName) {
                    throw 'Alrd sent';
                }
                const embed = new discord_js_1.MessageEmbed()
                    .setTitle(`${post.link_flair_text
                    ? `[${post.link_flair_text}] `
                    : ''}${entities.decodeHTML(post.title)}`)
                    .setURL(`https://redd.it/${post.id}`)
                    .setDescription(`${post.is_self
                    ? entities.decodeHTML(post.selftext.length > 253
                        ? post.selftext
                            .slice(0, 253)
                            .concat('...')
                        : post.selftext)
                    : ''}`)
                    .setImage(valid_url_1.default.isUri(post.url_overridden_by_dest)
                    ? post.url_overridden_by_dest
                    : null)
                    .setFooter(`${post.is_self ? 'self post' : 'link post'} by ${post.author}`)
                    .setColor(message.settings.embedColor)
                    .setTimestamp(new Date(post.created_utc * 1000));
                message.channel.send(embed);
                lastPostName = post.name;
            })
                .catch((err) => {
                if (err != 'Alrd sent') {
                    client.settings.set(message.guild.id, 'false', 'reddit');
                    client.logger(err, 'error');
                }
            });
        }
    }, 2 * 1000);
};
exports.run = run;
exports.name = 'reddit';
exports.conf = {
    aliases: ['memes'],
    permLevel: 'Moderator',
};
exports.help = {
    category: 'Reddit',
    description: 'A subreddit in your channel!',
    usage: 'reddit subreddit\nmemes',
};
