import express from 'express';
import { factory } from 'fe-library/lib/core/app';
import { MENU_TYPE } from '../../../common/config';
import { javaUserAPI } from '../../core/remoteInterface';
import * as api from './api.config';
import menuData from './menuData';
/* eslint-disable no-unused-vars  */
import { getCurrentUser } from '../core';

const router = express.Router();

router.post('/list', factory(async (req, res) => {
  return javaUserAPI(req, res).post(api.getMenuList, req.body);
}));

router.get('/details/:id', factory(async (req, res) => {
  const { id } = req.params;
  return javaUserAPI(req, res).get(api.getMenuDetails(id));
}));

router.post('/save', factory(async (req, res) => {
  const result = javaUserAPI(req, res).post(api.menuSave, req.body);
  const { resultCode } = result;
  if (resultCode === 200) {
    req.session.menu = undefined;
  }
  return result;
}));

router.post('/delete', factory(async (req, res) => {
  return javaUserAPI(req, res).post(api.menuDelete, req.body);
}));

router.get('/auth/list', factory(async (req, res) => {
  const { headers: { platform } } = req;
  const menuType = MENU_TYPE(platform);
  return javaUserAPI(req, res).post(api.authMenuList, { menuType });
}));

router.post('/author', async (req, res, next) => {
  try {
    if (!req.session.menu) {
      const result = await getCurrentUser(req, res, next);
      const { resultCode } = result;
      if (resultCode.toString() !== '200') return;
    }
    res.json({
      resultCode: 200,
      // data: menuData,
      data: req.session.menu,
    });
  } catch (e) {
    next(e);
  }
});

export default router;
