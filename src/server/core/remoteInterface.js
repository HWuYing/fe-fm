import createAPIServer from 'fe-library/lib/core/interface';
import { JAVA_HOST, PLATFORM } from '../config';

/* eslint-disable no-undef */
const javaDecorationAPI = createAPIServer(`${JAVA_HOST}/decoration/w/api`, PLATFORM);
const javaGlobalAPI = createAPIServer(`${JAVA_HOST}`, PLATFORM);
const javaAPI = createAPIServer(JAVA_HOST, PLATFORM);
const javaStoreApi = createAPIServer(`${JAVA_HOST}/user/w/api`, PLATFORM);
// 用户
const javaUserAPI = createAPIServer(`${JAVA_HOST}/user/w/api`, PLATFORM);
const javaGoodsAPI = createAPIServer(`${JAVA_HOST}/good/w/api`, PLATFORM);
const javaSearchAPI = createAPIServer(`${JAVA_HOST}/search/w/api`, PLATFORM);
const javaConfigAPI = createAPIServer(`${JAVA_HOST}/config/w/api`, PLATFORM);

export {
  javaAPI,
  javaUserAPI,
  javaGlobalAPI,
  javaStoreApi,
  javaGoodsAPI,
  javaSearchAPI,
  javaDecorationAPI,
  javaConfigAPI,
};
