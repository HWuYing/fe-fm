import express from 'express';
/* eslint-disable no-unused-vars  */
import { factory } from 'fe-library/lib/core/app';
import { javaDecorationAPI } from '../../core/remoteInterface';
import * as api from './api.config';

const router = express.Router();

router.post(
  '/queryPage',
  factory(async (req, res, next) => {
    return javaDecorationAPI(req, res).post(api.getList, req.body);
  })
);

export default router;
