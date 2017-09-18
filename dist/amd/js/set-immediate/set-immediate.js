/*can-util@3.10.6#js/set-immediate/set-immediate*/
define([
    'require',
    'exports',
    'module',
    'can-globals/global'
], function (require, exports, module) {
    (function (global) {
        'use strict';
        var global = require('can-globals/global')();
        module.exports = global.setImmediate || function (cb) {
            return setTimeout(cb, 0);
        };
    }(function () {
        return this;
    }()));
});