/*can-util@3.9.2#js/is-promise/is-promise*/
define(function (require, exports, module) {
    'use strict';
    var canReflect = require('can-reflect');
    module.exports = function (obj) {
        return canReflect.isPromise(obj);
    };
});