import express from 'express';
import { factory } from 'fe-library/lib/core/app';
import { javaUserAPI } from '../../../core/remoteInterface';
import * as api from './api.config';

const router = express.Router();

router.post('/chgStatus', factory(async (req, res) => {
  return javaUserAPI(req, res).post(api.chgStatus, req.body);
}));

export default router;
