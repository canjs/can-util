/*can-util@3.11.7#js/global/global*/
define([
    'require',
    'exports',
    'module',
    'can-namespace',
    'can-globals/global'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        var namespace = require('can-namespace');
        module.exports = namespace.global = require('can-globals/global');
    }(function () {
        return this;
    }(), require, exports, module));
});