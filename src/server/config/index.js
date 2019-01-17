import defaultEnv from '../../../default.env';

const { NODE_ENV } = process.env;
const isDev = NODE_ENV === 'development';
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const API_VERSION = isDev ? defaultEnv.__API_VERSION__ : __API_VERSION__;
const JAVA_HOST = isDev ? defaultEnv.__JAVA_HOST__ : __JAVA_HOST__;
const PLATFORM = isDev ? defaultEnv.__PLATFORM__ : __PLATFORM__;
const PORT = isDev ? defaultEnv.__PORT__ : __PORT__;
const SYSTEM_NAME = isDev ? defaultEnv.__SYSTEM_NAME__ : __SYSTEM_NAME__;

export const sessionStore = {
  host: isDev ? defaultEnv.REDIS_HOST : REDIS_HOST,
  port: isDev ? defaultEnv.REDIS_PORT : REDIS_PORT,
  logErrors: true,
};

export {
  API_VERSION,
  JAVA_HOST,
  PLATFORM,
  SYSTEM_NAME,
  PORT,
}
