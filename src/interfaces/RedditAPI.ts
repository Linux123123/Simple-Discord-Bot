export interface RedditAPI {
    kind: string;
    data: Data2;
}

interface Data2 {
    modhash: string;
    dist: number;
    children: Child[];
    after: string;
}

interface Child {
    kind: string;
    data: Data;
}

interface Data {
    link_flair_text?: string;
    subreddit: string;
    selftext: string;
    author_fullname: string;
    saved: boolean;
    gilded: number;
    clicked: boolean;
    title: string;
    subreddit_name_prefixed: string;
    hidden: boolean;
    pwls: number;
    downs: number;
    thumbnail_height: number;
    hide_score: boolean;
    name: string;
    quarantine: boolean;
    link_flair_text_color: string;
    upvote_ratio: number;
    subreddit_type: string;
    ups: number;
    total_awards_received: number;
    thumbnail_width: number;
    is_original_content: boolean;
    is_reddit_media_domain: boolean;
    is_meta: boolean;
    can_mod_post: boolean;
    score: number;
    author_premium: boolean;
    thumbnail: string;
    edited: boolean;
    post_hint: string;
    is_self: boolean;
    created: number;
    link_flair_type: string;
    wls: number;
    author_flair_type: string;
    domain: string;
    allow_live_comments: boolean;
    url_overridden_by_dest: string;
    archived: boolean;
    no_follow: boolean;
    is_crosspostable: boolean;
    pinned: boolean;
    over_18: boolean;
    preview: Preview;
    media_only: boolean;
    can_gild: boolean;
    spoiler: boolean;
    locked: boolean;
    visited: boolean;
    subreddit_id: string;
    link_flair_background_color: string;
    id: string;
    is_robot_indexable: boolean;
    author: string;
    num_comments: number;
    send_replies: boolean;
    whitelist_status: string;
    contest_mode: boolean;
    author_patreon_flair: boolean;
    permalink: string;
    parent_whitelist_status: string;
    stickied: boolean;
    url: string;
    subreddit_subscribers: number;
    created_utc: number;
    num_crossposts: number;
    is_video: boolean;
}

interface Preview {
    images: Image[];
    enabled: boolean;
}

interface Image {
    source: Source;
    resolutions: Source[];
    id: string;
}

interface Source {
    url: string;
    width: number;
    height: number;
}
