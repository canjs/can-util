/*can-util@3.3.7#js/is-node/is-node*/
define(function (require, exports, module) {
    (function (global) {
        'use strict';
        module.exports = function () {
            return typeof process === 'object' && {}.toString.call(process) === '[object process]';
        };
    }(function () {
        return this;
    }()));
});