const interceptor = ['/login', '/user/login'];

/* eslint-disable no-console */
export const beforeInterceptor =  async (req, res, next) => {
  const { headers: { token = '' } = {}, session: { token: tokenId } = {}, path, method } = req;
  // console.log('=====interceptor=====');
  // console.log('token ===>', token || tokenId);
  // console.log('body', req.body);
  // console.log(path, method);
  if (interceptor.includes(path)) next();
  else if (!token && !tokenId) res.redirect('/login');
  else next();
};

export const afterInterceptor = async (obj, req, res, next) => {
  try {
    if (obj && obj.$promise) {
      const result = await obj.$promise;
      const { resultCode } = result;
      if (resultCode) res.json(result);
      else next(result);
    } else next(obj);
  } catch (e) {
    next(e);
  }
};
