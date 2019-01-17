import express from 'express';
/* eslint-disable no-unused-vars  */
import { factory } from 'fe-library/lib/core/app';
import { javaSearchAPI, javaGoodsAPI } from '../../core/remoteInterface';
import * as api from './api.config';

const router = express.Router();

router.post(
  '/queryAppPage',
  factory(async (req, res, next) => {
    return javaSearchAPI(req, res).post(api.getAppSkuList, req.body);
  })
);

router.post(
  '/queryPage',
  factory(async (req, res) => {
    return javaGoodsAPI(req, res).post(api.getSkuList, req.body);
  })
);

router.post(
  '/queryBrands',
  factory(async (req, res) => {
    return javaGoodsAPI(req, res).post(api.getBrands, req.body);
  })
);
export default router;
