import { javaUserAPI } from '../../core/remoteInterface';
import * as api from './api.config';

const getCurrentUser = async (req, res, next) => {
  let result;
  try {
    result = await javaUserAPI(req, res).get(api.getUser);
    const { resultCode, data } = result;
    if (resultCode.toString() !== '200') return res.json(result);
    const user = { ...data };
    delete user.menuData;
    req.session.user = user;
    req.session.menu = data.menuData;
  } catch (e) {
    next(e);
  }
  return result;
};

export {
  getCurrentUser,
}
