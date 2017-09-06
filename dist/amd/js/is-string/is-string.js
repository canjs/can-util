/*can-util@3.10.1#js/is-string/is-string*/
define([
    'require',
    'exports',
    'module',
    '../dev/dev'
], function (require, exports, module) {
    'use strict';
    var dev = require('../dev/dev');
    var hasWarned = false;
    module.exports = function isString(obj) {
        return typeof obj === 'string';
    };
});