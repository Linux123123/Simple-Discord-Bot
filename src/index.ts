import { config } from './config/config';
import { Config } from './interfaces/Config';
import { Bot } from './client/client';

new Bot().start(config as Config);
