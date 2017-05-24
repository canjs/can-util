/*can-util@3.7.0#js/is-promise/is-promise*/
define(function (require, exports, module) {
    'use strict';
    var types = require('can-types');
    module.exports = function (obj) {
        return types.isPromise(obj);
    };
});