/*can-util@3.3.7#js/assign/assign*/
define(function (require, exports, module) {
    'use strict';
    module.exports = function (d, s) {
        for (var prop in s) {
            d[prop] = s[prop];
        }
        return d;
    };
});