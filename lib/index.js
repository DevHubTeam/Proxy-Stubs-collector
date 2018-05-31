import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import indexRouter from './routers/indexRouter';


const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


app.use('/', indexRouter);
 
app.listen(3000, ()=>{
  console.log('Server running at http://127.0.0.1:3000/');
});
