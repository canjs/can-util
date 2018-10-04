/*can-util@3.13.0#js/is-array/is-array*/
define([
    'require',
    'exports',
    'module',
    'can-log/dev',
    'can-namespace'
], function (require, exports, module) {
    'use strict';
    var dev = require('can-log/dev');
    var namespace = require('can-namespace');
    var hasWarned = false;
    module.exports = namespace.isArray = function (arr) {
        return Array.isArray(arr);
    };
});