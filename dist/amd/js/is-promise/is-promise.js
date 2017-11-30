/*can-util@3.10.16#js/is-promise/is-promise*/
define([
    'require',
    'exports',
    'module',
    'can-reflect'
], function (require, exports, module) {
    'use strict';
    var canReflect = require('can-reflect');
    module.exports = function (obj) {
        return canReflect.isPromise(obj);
    };
});