/*can-util@3.11.0#js/is-string/is-string*/
define([
    'require',
    'exports',
    'module',
    'can-log/dev'
], function (require, exports, module) {
    'use strict';
    var dev = require('can-log/dev');
    var hasWarned = false;
    module.exports = function isString(obj) {
        return typeof obj === 'string';
    };
});