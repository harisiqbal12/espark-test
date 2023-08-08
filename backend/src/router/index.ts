import { Router } from 'express';

import { adminPrivilages } from '@middleware';

import userRouter from './user.router';
import itemRouter from './items.router';

const router = Router();

router.get('/', (req, res) => {
	res.status(200).send('<h1>Backend Api</h1>');
});

router.use('/auth', userRouter);
router.use('/items', adminPrivilages);
router.use('/items', itemRouter);

export default router;
