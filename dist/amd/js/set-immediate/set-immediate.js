/*can-util@3.1.0#js/set-immediate/set-immediate*/
define(function (require, exports, module) {
    (function (global) {
        var global = require('../global/global')();
        module.exports = global.setImmediate || function (cb) {
            return setTimeout(cb, 0);
        };
    }(function () {
        return this;
    }()));
});