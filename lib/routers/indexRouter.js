import { Router } from 'express';
import request from 'request';
import { StubsGenerator } from '../modules/stub-geneator/generate-stubs.module';
import promisePipe from 'promise.pipe';

const decompressResponse = require('decompress-response');
const router = Router();

router.all('/', async (req, res, next) => {
    const { url, scenario } = req.query;

    if (!url) {
        return res
            .status(403)
            .json('Please provide a query! http://localhost:8080?scenario=<ScenarioName>&url=<OriginalURL>');
    }

    const scenarioName = scenario || 'test_scenario';

    const interceptResponse = async (error, response, body) => {
        //@todo create stubs with a scenario name e.g. test
        await new StubsGenerator(response, scenarioName).save();
    };

    req.pipe(request({ url, gzip: true }, interceptResponse));
    req.pipe(request({ url })).pipe(res);
});

export default router;
