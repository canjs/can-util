/*can-util@3.11.7#js/is-node/is-node*/
define([
    'require',
    'exports',
    'module',
    'can-namespace'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        var namespace = require('can-namespace');
        module.exports = namespace.isNode = function () {
            return typeof process === 'object' && {}.toString.call(process) === '[object process]';
        };
    }(function () {
        return this;
    }(), require, exports, module));
});