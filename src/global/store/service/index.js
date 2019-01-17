import { fetch } from '@util';

const { get, post } = fetch;

export const fetchUser =  async (param, context) => post('/user/details', {
  body: param,
  context,
});

export const loginOut = async (body, context) =>  {
  return get('/user/loginOut', { body, context });
};
