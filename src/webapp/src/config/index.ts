import {Config} from './config.model';
import {DEFAULT_ENVIRONMENT} from './constants';

const APP_ENV = process.env.APP_ENV === undefined ? DEFAULT_ENVIRONMENT : process.env.APP_ENV;

export const config: Config = {
    env: APP_ENV,
    base_url: 'http://localhost:3000'
};