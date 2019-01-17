import express from 'express';
import globalUse from 'fe-library/lib/core/glob.router';
import { javaAPI } from '../core/remoteInterface';
import user from './user';
import menu from './menu';
import role from './role';
import org from './org';
import pageConfig from './pageConfig';
import uiCategory from './uiCategory';
import globalEnum from './globalEnum';
import sku from './sku';
import plan from './plan';
import company from './company';

const router = express.Router();

globalUse(router, javaAPI);
router.use('/user', user);
router.use('/menu', menu);
router.use('/role', role);
router.use('/org', org);
router.use('/sku', sku);
router.use('/plan', plan);
router.use('/globalEnum', globalEnum);
router.use('/pageConfig', pageConfig);
router.use('/uiCategory', uiCategory);
router.use(company);

export default router;
