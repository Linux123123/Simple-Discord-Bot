import { TextChannel } from 'discord.js';
import fetch from 'node-fetch';
import { decode } from 'html-entities';
import validUrl from 'valid-url';
import { Bot } from '../classes/Client';
import { RedditAPI } from '../interfaces/RedditAPI';
import { GuildSettings } from '../interfaces/GuildSettings';

export class Reddit {
    constructor(
        private client: Bot,
        private channel: TextChannel,
        private subReddit: string,
        private settings: GuildSettings
    ) {
        client.reddit.set(channel.id + subReddit, this);
    }
    private stopped = false;
    private url = '';
    private lastPostId = '';
    private reqOptions = {
        responseEncoding: 'utf8',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    };

    public start = async (): Promise<void> => {
        this.url = `https://www.reddit.com/r/${this.subReddit.toLowerCase()}/new.json?limit=1`;
        this.client.logger.cmd(
            `Retrieving reddit posts on ${this.channel.guild.name} from r/${this.subReddit}`
        );
        const intervalId = setInterval(async () => {
            try {
                if (this.stopped) {
                    this.client.logger.cmd(
                        `Stopping reddit retrievals on ${this.channel.guild.name} from r/${this.subReddit}!`
                    );
                    throw 'stop';
                }
                const rawData = await fetch(this.url, this.reqOptions);
                if (!rawData.ok) {
                    this.channel.send(
                        `Error retrieving from subreddit r/${this.subReddit}! Derp. Is it really a real one?`
                    );
                    throw `Error retrieving data on ${this.channel.guild.name} from r/${this.subReddit}!`;
                }
                const data = (await rawData.json()) as RedditAPI;
                if (data.data.after == null) {
                    this.channel.send(
                        `Error retrieving from subreddit r/${this.subReddit}! Derp. Is it really a real one?`
                    );
                    throw `Error retrieving data on ${this.channel.guild.name} from r/${this.subReddit}!`;
                }
                const post = data.data.children[0].data;
                if (post.id === this.lastPostId) {
                    throw 'sent';
                }
                const embed = this.client.embed(
                    {
                        title: `${
                            post.link_flair_text
                                ? `[${post.link_flair_text}] `
                                : ''
                        }${decode(post.title)}`,
                        url: `https://redd.it/${post.id}`,
                        description: `${
                            post.is_self
                                ? decode(
                                      post.selftext.length > 253
                                          ? post.selftext
                                                .slice(0, 253)
                                                .concat('...')
                                          : post.selftext
                                  )
                                : ''
                        }`,
                        image: {
                            url: validUrl.isUri(post.url_overridden_by_dest)
                                ? post.url_overridden_by_dest
                                : undefined,
                        },
                        footer: {
                            text: `${
                                post.is_self ? 'self post' : 'link post'
                            } by ${post.author}`,
                        },
                    },
                    undefined,
                    this.settings.embedColor
                );
                this.channel.send(embed);
                this.lastPostId = post.id;
            } catch (e) {
                if (!(e === 'sent')) {
                    clearInterval(intervalId);
                    if (e === 'stop') return;
                    this.client.logger.error(`There has been an error: ${e}`);
                    console.error(e);
                }
            }
        }, 4 * 1000);
    };
    public check = (subReddit: string, channel?: TextChannel): boolean => {
        if (this.subReddit === subReddit) {
            if (channel && !(channel.id === this.channel.id)) {
                return false;
            }
            return true;
        }
        return false;
    };
    public stop = (): void => {
        this.client.reddit.delete(this.channel.id + this.subReddit);
        this.stopped = true;
    };
}
