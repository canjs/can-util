/*can-util@3.9.0-pre.0#js/is-iterable/is-iterable*/
define(function (require, exports, module) {
    'use strict';
    var types = require('can-types');
    module.exports = function (obj) {
        return obj && !!obj[types.iterator];
    };
});