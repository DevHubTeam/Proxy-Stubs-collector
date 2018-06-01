'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StorageService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nodeStorage = require('node-storage');

var _nodeStorage2 = _interopRequireDefault(_nodeStorage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StorageService = exports.StorageService = function () {
    function StorageService(path) {
        _classCallCheck(this, StorageService);

        this.isInitialized = false;

        this.pathToStorage = path;
    }

    _createClass(StorageService, [{
        key: 'init',
        value: function init() {
            console.log(this.pathToStorage);
            this.store = new _nodeStorage2.default(this.pathToStorage);
            this.isInitialized = true;
        }
    }, {
        key: 'checkInitialized',
        value: function checkInitialized() {
            if (!this.isInitialized) throw new Error('Storage need to be Initialized!');
        }
    }, {
        key: 'getItem',
        value: function getItem(key) {
            this.checkInitialized();

            return this.store.get(key);
        }
    }, {
        key: 'setItem',
        value: function setItem(key, value) {
            this.checkInitialized();

            return this.store.put(key, value);
        }
    }]);

    return StorageService;
}();