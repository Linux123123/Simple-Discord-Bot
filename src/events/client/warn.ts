import { RunFunction } from '../../interfaces/Event';
export const name: string = 'warn';
export const run: RunFunction = async (client, info: unknown) => {
    client.logger(`An error has accured: \n${JSON.stringify(info)}`, 'warn');
};
