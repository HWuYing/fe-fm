import { fetch } from '@util';

const { post } = fetch;

export const login = async param =>
  post('/user/login', {
    body: param,
  });
