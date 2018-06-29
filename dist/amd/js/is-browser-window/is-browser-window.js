/*can-util@3.11.6#js/is-browser-window/is-browser-window*/
define([
    'require',
    'exports',
    'module',
    'can-namespace',
    'can-globals/is-browser-window'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        var namespace = require('can-namespace');
        module.exports = namespace.isBrowserWindow = require('can-globals/is-browser-window');
    }(function () {
        return this;
    }(), require, exports, module));
});