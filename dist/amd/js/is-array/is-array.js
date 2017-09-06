/*can-util@3.10.0#js/is-array/is-array*/
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