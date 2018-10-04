/*can-util@3.13.0#dom/ajax/ajax*/
define([
    'require',
    'exports',
    'module',
    'can-log/dev',
    'can-namespace',
    'can-ajax'
], function (require, exports, module) {
    'use strict';
    var canDev = require('can-log/dev');
    var namespace = require('can-namespace');
    module.exports = namespace.ajax = require('can-ajax');
});