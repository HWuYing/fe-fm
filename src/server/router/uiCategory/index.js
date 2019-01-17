import express from 'express';
/* eslint-disable no-unused-vars  */
import { factory } from 'fe-library/lib/core/app';
import { javaConfigAPI } from '../../core/remoteInterface';
import * as api from './api.config';

const router = express.Router();

router.get(
  '/details/:id',
  factory(async (req, res) => {
    const { id } = req.params;
    return javaConfigAPI(req, res).get(api.detail(id));
  })
);

router.get(
  '/list',
  factory(async (req, res) => {
    return javaConfigAPI(req, res).get(api.query);
  })
);

router.post(
  '/save',
  factory(async (req, res) => {
    return javaConfigAPI(req, res).post(api.add, req.body);
  })
);

export default router;
