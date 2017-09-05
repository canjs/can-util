/*can-util@3.9.10#js/global/global*/
define([
    'require',
    'exports',
    'module',
    '../dev/dev',
    'can-globals/global'
], function (require, exports, module) {
    (function (global) {
        'use strict';
        var canDev = require('../dev/dev');
        module.exports = require('can-globals/global');
    }(function () {
        return this;
    }()));
});