import { Router } from 'express';
import request from 'request';
import { StubsGenerator } from '../modules/stub-geneator/generate-stubs.module';
import promisePipe from 'promise.pipe';
const decompressResponse = require('decompress-response');

const router = Router();

router.all('/', async (req, res, next) => {
    const { url } = req.query;    
    req.pipe(request({url, gzip: true}, interceptResponse))

    req.pipe(request({url})).pipe(res);
    
});


const interceptResponse = async (error, response, body) => {
    //@todo create stubs with a scenario name e.g. test
    await new StubsGenerator(response, 'Test').save();
}
export default router;
