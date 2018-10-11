import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import proxyRouter from './routers/indexRouter';
import configRouter from './routers/configRouter';
import session from 'express-session';

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
    })
);

app.use('/', proxyRouter);
app.use('/config', configRouter);

app.listen(8080, () => {
    console.log('Server running at http://localhost:8080');
});
