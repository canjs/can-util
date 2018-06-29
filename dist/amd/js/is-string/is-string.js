/*can-util@3.11.6#js/is-string/is-string*/
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
    module.exports = namespace.isString = function isString(obj) {
        return typeof obj === 'string';
    };
});