/*can-util@3.9.0-pre.5#js/is-promise/is-promise*/
define(function (require, exports, module) {
    'use strict';
    var types = require('can-types');
    module.exports = function (obj) {
        return types.isPromise(obj);
    };
});