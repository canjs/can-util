/*can-util@3.0.12#js/is-node/is-node*/
define(function (require, exports, module) {
    (function (global) {
        module.exports = function () {
            return typeof process === 'object' && {}.toString.call(process) === '[object process]';
        };
    }(function () {
        return this;
    }()));
});