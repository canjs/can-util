/*can-util@3.10.14#js/is-node/is-node*/
define(function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        module.exports = function () {
            return typeof process === 'object' && {}.toString.call(process) === '[object process]';
        };
    }(function () {
        return this;
    }(), require, exports, module));
});