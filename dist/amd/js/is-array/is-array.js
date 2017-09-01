/*can-util@3.9.9#js/is-array/is-array*/
define([
    'require',
    'exports',
    'module',
    '../dev/dev'
], function (require, exports, module) {
    'use strict';
    var dev = require('../dev/dev');
    var hasWarned = false;
    module.exports = function (arr) {
        return Array.isArray(arr);
    };
});