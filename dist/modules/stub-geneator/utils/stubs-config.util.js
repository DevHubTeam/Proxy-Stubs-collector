'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StubsConfigUtil = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _storage = require('../../../services/storage.service');

var _fileSystem = require('../../../services/file-system.service');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StubsConfigUtil = exports.StubsConfigUtil = function () {
    function StubsConfigUtil(url, urlHash, scenarioName, path) {
        _classCallCheck(this, StubsConfigUtil);

        this.fileSystem = new _fileSystem.FileSystemService();

        this.url = url;
        this.urlHash = urlHash;
        this.path = path + '/config.json';
        this.scenarioName = scenarioName;
        this.store = new _storage.StorageService(this.path);
    }

    _createClass(StubsConfigUtil, [{
        key: 'saveConfigs',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.generateConfigFile();

                            case 2:
                                this.store.init();
                                this.saveConfigToStorage();

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function saveConfigs() {
                return _ref.apply(this, arguments);
            }

            return saveConfigs;
        }()
    }, {
        key: 'generateConfigFile',
        value: function generateConfigFile() {
            if (this.fileSystem.checkPathExists(this.path)) return;

            var configMetaDetails = {
                scenarioName: this.scenarioName,
                date: new Date()
            };

            return this.fileSystem.createFile(this.path, JSON.stringify(configMetaDetails));
        }
    }, {
        key: 'saveConfigToStorage',
        value: function saveConfigToStorage() {
            var configs = this.store.getItem(this.scenarioName);

            if (!configs) {
                configs = {};
            }
            configs[this.url] = this.urlHash;

            this.store.setItem(this.scenarioName, configs);
        }
    }]);

    return StubsConfigUtil;
}();