import express from 'express';
import decor from './decor';
import provider from './provider';
import store from './store';
import company from './model';

const router = express.Router();

router.use('/decor', decor);
router.use('/provider', provider);
router.use('/store', store);
router.use('/company', company);

export default router;
