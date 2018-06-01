'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _express = require('express');

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _generateStubs = require('../modules/stub-geneator/generate-stubs.module');

var _promise = require('promise.pipe');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var decompressResponse = require('decompress-response');

var router = (0, _express.Router)();

router.all('/', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res, next) {
        var _req$query, url, scenario, scenarioName, interceptResponse;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _req$query = req.query, url = _req$query.url, scenario = _req$query.scenario;

                        if (url) {
                            _context2.next = 3;
                            break;
                        }

                        return _context2.abrupt('return', res.status(403).json('Please provide <url> query!'));

                    case 3:
                        scenarioName = scenario || 'test_scenario';

                        interceptResponse = function () {
                            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(error, response, body) {
                                return _regenerator2.default.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                _context.next = 2;
                                                return new _generateStubs.StubsGenerator(response, scenarioName).save();

                                            case 2:
                                            case 'end':
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, undefined);
                            }));

                            return function interceptResponse(_x4, _x5, _x6) {
                                return _ref2.apply(this, arguments);
                            };
                        }();

                        req.pipe((0, _request2.default)({ url: url, gzip: true }, interceptResponse));

                        req.pipe((0, _request2.default)({ url: url })).pipe(res);

                    case 7:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}());

exports.default = router;