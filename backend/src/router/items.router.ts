import { Router } from 'express';

import { items } from '@controller';

const router = Router();

router.get('/', items.allItems);
router.post('/', items.createItem);
router.get('/stats', items.statsItem);
router.get('/single/:id', items.getSingle);
router.get('/service/:type/:name/:response', items.itemsService);
router.delete('/:id', items.itemDelete);
router.patch('/:id', items.itemUpdate);
router.patch('/borrow/:id', items.borrowItem);
router.delete('/borrow/:id', items.unborrowItem);

export default router;
