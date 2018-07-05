/*can-util@3.11.7#js/is-promise/is-promise*/
define([
    'require',
    'exports',
    'module',
    'can-reflect',
    'can-namespace'
], function (require, exports, module) {
    'use strict';
    var canReflect = require('can-reflect');
    var namespace = require('can-namespace');
    module.exports = namespace.isPromise = function (obj) {
        return canReflect.isPromise(obj);
    };
});