/*can-util@3.10.19#js/is-array/is-array*/
define([
    'require',
    'exports',
    'module',
    'can-log/dev'
], function (require, exports, module) {
    'use strict';
    var dev = require('can-log/dev');
    var hasWarned = false;
    module.exports = function (arr) {
        return Array.isArray(arr);
    };
});