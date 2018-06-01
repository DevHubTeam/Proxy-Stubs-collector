'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FileSystemService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FileSystemService = exports.FileSystemService = function () {
    function FileSystemService() {
        _classCallCheck(this, FileSystemService);
    }

    _createClass(FileSystemService, [{
        key: 'createFolder',
        value: function createFolder(path) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                if (!_this.checkPathExists(path)) {
                    _fs2.default.mkdir(path, function (err) {
                        console.log("Directory created successfully!");
                        resolve();
                    });
                } else {
                    resolve();
                }
            });
        }
    }, {
        key: 'createFile',
        value: function createFile(path, content) {
            return new Promise(function (resolve, reject) {
                _fs2.default.writeFile(path, content, 'utf8', function (err) {
                    resolve();
                });
            });
        }
    }, {
        key: 'checkPathExists',
        value: function checkPathExists(path) {
            return _fs2.default.existsSync(path);
        }
    }]);

    return FileSystemService;
}();