'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StubsGenerator = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _stringHash = require('string-hash');

var _stringHash2 = _interopRequireDefault(_stringHash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _nodeStorage = require('node-storage');

var _nodeStorage2 = _interopRequireDefault(_nodeStorage);

var _fileSystem = require('../../services/file-system.service');

var _stubsConfig = require('./utils/stubs-config.util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//@todo: move fileSytem to one service
// remove repeated functionalities 
var StubsGenerator = exports.StubsGenerator = function () {
    function StubsGenerator(response, scenarioName) {
        _classCallCheck(this, StubsGenerator);

        this.minDir = 'stubs_folder';

        this.response = response;
        this.scenarioName = scenarioName;
        this.FileSystemService = new _fileSystem.FileSystemService();
    }

    _createClass(StubsGenerator, [{
        key: 'save',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var urlHash, configInstance;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                urlHash = this.getUrlHash();
                                configInstance = new _stubsConfig.StubsConfigUtil(this.url, urlHash, this.scenarioName, 'stubs_folder/' + this.scenarioName);
                                _context.next = 4;
                                return this.setUpFolder();

                            case 4:
                                _context.next = 6;
                                return this.saveBodyFile(urlHash, this.body);

                            case 6:
                                _context.next = 8;
                                return configInstance.saveConfigs();

                            case 8:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function save() {
                return _ref.apply(this, arguments);
            }

            return save;
        }()
    }, {
        key: 'saveBodyFile',
        value: function saveBodyFile(urlHash, content) {
            var path = this.minDir + '/' + this.scenarioName + '/' + urlHash + '.json';

            return this.FileSystemService.createFile(path, content);
        }
    }, {
        key: 'setUpFolder',
        value: function setUpFolder() {
            var dir = 'stubs_folder/' + this.scenarioName;

            return this.FileSystemService.createFolder(dir).catch(function (err) {
                console.log(err);
            });
        }
    }, {
        key: 'generateHashString',
        value: function generateHashString(url) {
            return (0, _stringHash2.default)(url);
        }
    }, {
        key: 'generateFileConfig',
        value: function generateFileConfig() {
            var dir = 'stubs_folder/' + this.scenarioName + '/config.json';
            if (this.FileSystemService.checkPathExists(dir)) return;

            return this.FileSystemService.createFile(dir, '{}');
        }
    }, {
        key: 'getUrlHash',
        value: function getUrlHash() {
            return (0, _stringHash2.default)(this.url);
        }
    }, {
        key: 'body',
        get: function get() {
            return this.response.body;
        }
    }, {
        key: 'url',
        get: function get() {
            var uri = this.response.request.uri;

            return uri.href;
        }
    }]);

    return StubsGenerator;
}();