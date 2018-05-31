import { Router } from 'express';
import request from 'request';

const router = Router();

router.all('/', (req, res, next) => {
    const { url } = req.query;
    req.pipe(request(url)).pipe(res);
});


export default router;
