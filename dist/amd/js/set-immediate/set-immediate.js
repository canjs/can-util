/*can-util@3.11.7#js/set-immediate/set-immediate*/
define([
    'require',
    'exports',
    'module',
    'can-globals/global',
    'can-namespace'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        var global = require('can-globals/global')();
        var namespace = require('can-namespace');
        module.exports = namespace.setImmediate = global.setImmediate || function (cb) {
            return setTimeout(cb, 0);
        };
    }(function () {
        return this;
    }(), require, exports, module));
});