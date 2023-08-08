import { Router } from 'express';

import { user } from '@controller';

const router = Router();

router.post('/login', user.login);
router.post('/signup', user.signup);
router.post('/verify', user.verify);

export default router;
