/*can-util@3.11.5#dom/contains/contains*/
define([
    'require',
    'exports',
    'module',
    'can-namespace'
], function (require, exports, module) {
    'use strict';
    var namespace = require('can-namespace');
    module.exports = namespace.contains = function (child) {
        return this.contains(child);
    };
});