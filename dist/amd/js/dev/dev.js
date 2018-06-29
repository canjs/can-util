/*can-util@3.11.6#js/dev/dev*/
define([
    'require',
    'exports',
    'module',
    'can-namespace',
    'can-log/dev'
], function (require, exports, module) {
    'use strict';
    var namespace = require('can-namespace');
    module.exports = namespace.dev = require('can-log/dev');
});