/*can-util@3.9.0-pre.7#js/set-immediate/set-immediate*/
define(function (require, exports, module) {
    (function (global) {
        'use strict';
        var global = require('../global/global')();
        module.exports = global.setImmediate || function (cb) {
            return setTimeout(cb, 0);
        };
    }(function () {
        return this;
    }()));
});