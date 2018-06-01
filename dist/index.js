'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _indexRouter = require('./routers/indexRouter');

var _indexRouter2 = _interopRequireDefault(_indexRouter);

var _configRouter = require('./routers/configRouter');

var _configRouter2 = _interopRequireDefault(_configRouter);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// parse application/x-www-form-urlencoded
app.use(_bodyParser2.default.urlencoded({ extended: false }));

// parse application/json
app.use(_bodyParser2.default.json());

app.use((0, _expressSession2.default)({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use('/', _indexRouter2.default);
app.use('/config', _configRouter2.default);

app.listen(3000, function () {
  console.log('Server running at http://127.0.0.1:3000/');
});