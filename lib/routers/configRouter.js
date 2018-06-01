import { Router } from 'express';

const router = Router();

router.get('/', async (req, res, next) => {
    res.send('hello');
});

export default router;
