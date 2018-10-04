/*can-util@3.13.0#js/last/last*/
define([
    'require',
    'exports',
    'module',
    'can-namespace'
], function (require, exports, module) {
    'use strict';
    var namespace = require('can-namespace');
    module.exports = namespace.last = function (arr) {
        return arr && arr[arr.length - 1];
    };
});