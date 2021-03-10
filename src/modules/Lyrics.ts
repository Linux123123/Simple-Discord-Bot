import fetch from 'node-fetch';
import { load } from 'cheerio';

export class Lyrics {
    header = {
        'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
    };

    private search = async (name: string) => {
        const data = await fetch(
                `https://www.musixmatch.com/search/${encodeURI(name)}`,
                {
                    headers: this.header,
                }
            ),
            $ = load(await data.text()),
            result = $('.media-card-title a').first().attr('href');

        return result == undefined ? false : result;
    };

    private lyrics = async (url: string) => {
        const data = await fetch('https://www.musixmatch.com' + url, {
                headers: this.header,
            }),
            $ = load(await data.text());
        $('.mxm-track-title__track small').remove();
        const result = {
            title: $('.mxm-track-title__track').text(),
            artists: $('.mxm-track-title h2').text(),
            lyrics: $('.mxm-lyrics__content').text(),
            albumImg: `http:${$('.banner-album-image-desktop img').attr(
                'src'
            )}`,
            url: 'https://www.musixmatch.com' + url,
        };
        return result.lyrics == undefined || result.lyrics == ''
            ? false
            : result;
    };

    public find = async (
        songName: string
    ): Promise<{
        title: string;
        artists: string;
        lyrics: string;
        albumImg: string;
        url: string;
    }> => {
        const searchResult = await this.search(songName);
        if (!searchResult) throw 'Cannot Find that Song!';

        const songResult = await this.lyrics(searchResult);
        if (!songResult) throw 'No Lyrics are Found';

        return songResult;
    };
}
