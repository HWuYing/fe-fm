import express from 'express';
import { factory } from 'fe-library/lib/core/app';
import { javaUserAPI } from '../../core/remoteInterface';
import { getCurrentUser } from '../core';
import * as api from './api.config';

const router = express.Router();

router.post('/login', factory(async (req, res) => {
  delete req.session.token;
  delete req.headers.token;
  const result = await javaUserAPI(req, res).post(api.login, req.body);
  const { resultCode, data } = result;
  if (resultCode === 200) {
    const { userId, token } = data;
    req.session.token = token;
    req.session.userId = userId;
    req.session.user = undefined;
    req.session.menu = undefined;
  }
  return result;
}));

router.get('/loginOut', factory(async (req, res) => {
  const result = await javaUserAPI(req, res).get(api.loginOut, req.body);
  const { resultCode } = result;
  if (resultCode === 200) {
    req.session.token = undefined;
    req.session.userId = undefined;
    req.session.user = undefined;
    req.session.menu = undefined;
  }
  return result;
}));


router.post('/details', async (req, res, next) => {
  if (!req.session.user) {
    const result = await getCurrentUser(req, res, next);
    const { resultCode } = result;
    if (resultCode.toString() !== '200') return;
  }
  res.json({
    resultCode: 200,
    data: req.session.user,
  });
});

router.get('/list', factory(async (req, res) => {
  return javaUserAPI(req, res).post(api.userList, req.query);
}));

router.get('/get/:id', factory(async (req, res) => {
  const { id } = req.params;
  return javaUserAPI(req, res).get(api.getDetails(id));
}));

router.post('/save', factory(async (req, res) => {
  return javaUserAPI(req, res).post(api.userSave, req.body);
}));

router.post('/chgPassword', factory(async (req, res) => {
  return javaUserAPI(req, res).post(api.changePwd, req.body);
}));

router.post('/delete', factory(async (req, res) => {
  return javaUserAPI(req, res).post(api.userDelete, req.body);
}));


export default router;
