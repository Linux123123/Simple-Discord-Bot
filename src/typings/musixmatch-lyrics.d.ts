declare module '@raflymln/musixmatch-lyrics' {
    interface songInfo {
        title: string;
        artists: string;
        lyrics: string;
        albumImg: string;
        url: string;
    }
    export function find(song: string): songInfo;
}
