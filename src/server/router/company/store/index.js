import express from 'express';
import { factory } from 'fe-library/lib/core/app';
import { javaStoreApi } from '../../../core/remoteInterface';
import * as api from './api.config';

const router = express.Router();

router.get('/detail/:id', factory(async (req, res) => {
  const { id } = req.params;
  return javaStoreApi(req, res).get(api.storeDetail(id), req.body);
}));

router.post('/save', factory(async (req, res) => {
  return javaStoreApi(req, res).post(api.storeSave, req.body);
}));

export default router;
