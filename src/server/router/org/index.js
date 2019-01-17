import express from 'express';
import { factory } from 'fe-library/lib/core/app';
import { javaUserAPI } from '../../core/remoteInterface';
import * as api from './api.config';

const router = express.Router();

router.get('/list', factory(async (req, res) => {
  return javaUserAPI(req, res).post(api.list, req.query);
}));

router.get('/get/:id', factory(async (req, res) => {
  const { id } = req.params;
  return javaUserAPI(req, res).get(api.details(id));
}));

router.post('/save', factory(async (req, res) => {
  return javaUserAPI(req, res).post(api.save, req.body);
}));

router.post('/delete', factory(async (req, res) => {
  return javaUserAPI(req, res).post(api.deleteOrg, req.body);
}));

export default router;
